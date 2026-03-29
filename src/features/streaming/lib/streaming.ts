import { MetaData, Packet, PacketType, WSMedia } from "@/lib/client/ws-media";
import { VideoRenderChannel } from "./video/render-channel";
import { AudioProcessorChannel } from "./audio/processor-channel";
import { AudioService } from "./audio/service";

type AudioManagerConfig = {
    initialVolume: number;
    events: {
        onError: (err: Error) => void;
        onAudioDisabled: () => void;
    };
};

class AudioManager {
    private volume: number;

    private gain: GainNode | null = null;
    private processor: AudioWorkletNode | null = null;
    private context: AudioContext | null = null;

    private audioDataSentOnce = false;

    readonly channel: AudioProcessorChannel;
    private readonly events: AudioManagerConfig["events"];

    constructor(conf: AudioManagerConfig) {
        this.volume = conf.initialVolume;
        this.events = { ...conf.events };

        // Open channel
        const worker = new Worker(new URL("./audio/processor-worker", import.meta.url));
        this.channel = new AudioProcessorChannel({ onError: err => this.err(err) });
        this.channel.open(worker);
    }

    private err(err: Error | unknown) {
        err = err instanceof Error ? err : new Error("Unknown error");
        this.events.onError(err as Error);
    }

    private get isMuted() {
        return this.volume === 0;
    }

    private get isEnabled() {
        return !!this.context && this.context.state === "running";
    }

    reset() {
        this.context?.close().catch(err => this.err(err));
        this.context = null;
        this.gain = null;
        this.processor = null;
        this.audioDataSentOnce = false;
    }

    async configure(sampleRate: number) {
        this.reset();

        try {
            const context = new AudioContext({ sampleRate });
            const initialContextState = context.state;
            await context.suspend();

            const gain = context.createGain();
            gain.gain.value = this.volume;

            await context.audioWorklet.addModule(require("./audio/processor.worklet"));
            const processor = new AudioWorkletNode(context, "audio-processor", {
                outputChannelCount: [2],
                numberOfInputs: 0,
                numberOfOutputs: 1,
            });
            processor.onprocessorerror = e => this.err(new Error(e.message));

            processor.connect(gain);
            gain.connect(context.destination);

            this.context = context;
            this.gain = gain;
            this.processor = processor;

            if (initialContextState !== "running") {
                this.events.onAudioDisabled();
            } else if (!this.isMuted) {
                this.play();
            }
        } catch (err) {
            this.err(err);
        }
    }

    sendData(data: AudioData) {
        if (!this.processor) return;

        if (!this.audioDataSentOnce) {
            try {
                const audioService = new AudioService({
                    totalChannels: data.numberOfChannels,
                    framesPerChannel: data.numberOfFrames,
                });

                this.channel.configure({ audioService });
                this.processor.port.postMessage({ type: "configure", data: { audioService } });

                this.audioDataSentOnce = true;
            } catch (err) {
                this.reset();
                this.err(err);
                return;
            }
        }

        this.channel.sendAudioData(data);
    }

    async play() {
        if (this.context && this.context.state === "suspended") {
            this.context.resume().catch(err => this.err(err));
        }
    }

    pause() {
        this.context?.suspend().catch(err => this.err(err));
    }

    setVolume(volume: number) {
        this.volume = Math.max(0, Math.min(volume, 1));
        if (this.gain) {
            this.gain.gain.value = this.volume;
        }
        if (this.isMuted) this.pause();
        else if (!this.isEnabled) this.play();
    }
}

type VideoManagerConfig = {
    events: {
        onError: (err: Error) => void;
    };
};

class VideoManager {
    readonly channel: VideoRenderChannel;
    private readonly events: VideoManagerConfig["events"];

    constructor(conf: VideoManagerConfig) {
        this.events = { ...conf.events };

        // Open channel
        const videoWorker = new Worker(new URL("./video/render-worker", import.meta.url));
        this.channel = new VideoRenderChannel({ onError: err => this.err(err) });
        this.channel.open(videoWorker);
    }

    private err(err: Error | unknown) {
        err = err instanceof Error ? err : new Error("Unknown error");
        this.events.onError(err as Error);
    }
}

type StreamingAPIConfig = {
    initialAudioVolume: number;
    events: {
        onConnect: () => void;
        onDisconnect: () => void;
        onConnecting: () => void;
        onError: (err: Error) => void;
        onAudioDisabled: () => void;
    };
};

export class StreamingAPI {
    private readonly ws: WSMedia;
    private readonly metaData = new MetaData();
    private readonly events: StreamingAPIConfig["events"];
    private readonly audio: AudioManager;
    private readonly video: VideoManager;

    private onConnectCalled = false;
    private audioDecoder: AudioDecoder | null = null;
    private videoDecoder: VideoDecoder | null = null;

    constructor(conf: StreamingAPIConfig) {
        this.events = { ...conf.events };

        this.audio = new AudioManager({
            initialVolume: conf.initialAudioVolume,
            events: {
                onError: err => this.err(err),
                onAudioDisabled: conf.events.onAudioDisabled,
            },
        });

        this.video = new VideoManager({
            events: { onError: err => this.err(err) },
        });

        this.ws = new WSMedia({
            onConnecting: this.events.onConnecting,
            onError: err => this.err(err),
            onDisconnect: () => {
                this.audio.reset();
                this.video.channel.clearScreen();
                this.onConnectCalled = false;
                this.events.onDisconnect();
            },
            onPacket: p => this.onPacket(p),
        });
    }

    private bytesToHex(bytes: Uint8Array) {
        return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    }

    private err(err: Error | unknown) {
        err = err instanceof Error ? err : new Error("Unknown error");
        this.events.onError(err as Error);
    }

    private createVideoDecoder(): VideoDecoder {
        return new VideoDecoder({
            output: frame => {
                if (this.ws.isOpen) this.video.channel.sendFrame(frame);
            },
            error: err => {
                this.err(err);
                this.disconnect();
            },
        });
    }

    private createAudioDecoder(): AudioDecoder {
        return new AudioDecoder({
            output: data => {
                if (this.ws.isOpen) this.audio.sendData(data);
            },
            error: err => {
                this.err(err);
                this.disconnect();
            },
        });
    }

    private onVideoFrame(packet: Packet) {
        if (this.videoDecoder) {
            const chunk = new EncodedVideoChunk({
                timestamp: packet.timestamp * 1000,
                type: packet.isKeyFrame ? "key" : "delta",
                data: packet.data,
            });
            this.videoDecoder.decode(chunk);
        }
    }

    private async onVideoSeqHdr(packet: Packet) {
        const codec = `avc1.${this.bytesToHex(packet.data.subarray(1, 4))}`;
        console.log({ videoCodec: codec });
        this.videoDecoder = this.createVideoDecoder();

        const conf: VideoDecoderConfig = {
            codec,
            description: packet.data,
        };

        try {
            const result = await VideoDecoder.isConfigSupported({
                ...conf,
                hardwareAcceleration: "prefer-hardware",
            });
            if (result.supported) {
                conf.hardwareAcceleration = "prefer-hardware";
            }
            // eslint-disable-next-line
        } catch {}

        this.videoDecoder.configure(conf);
    }

    private onAudioFrame(packet: Packet) {
        if (this.audioDecoder) {
            const chunk = new EncodedAudioChunk({
                data: packet.data,
                timestamp: packet.timestamp * 1000,
                type: "key",
            });
            this.audioDecoder.decode(chunk);
        }
    }

    private onAudioSeqHdr(packet: Packet) {
        const objType = (packet.data[0] & 0b11111000) >> 3;
        const codec = `mp4a.40.${objType}`;
        console.log({ audioCodec: codec });
        this.audioDecoder = this.createAudioDecoder();
        this.audioDecoder.configure({
            codec,
            description: packet.data,
            numberOfChannels: this.metaData.audioChannels,
            sampleRate: this.metaData.audioSampleRate,
        });
    }

    private async onMetaData(packet: Packet) {
        this.metaData.decode(packet.data);
        this.audio.configure(this.metaData.audioSampleRate);
        this.video.channel.sendMetaData({
            width: this.metaData.videoWidth,
            height: this.metaData.videoHeight,
        });
    }

    private onPacket(packet: Packet) {
        switch (packet.type) {
            case PacketType.VideoFrame:
                this.onVideoFrame(packet);
                break;
            case PacketType.AudioFrame:
                this.onAudioFrame(packet);
                break;
            case PacketType.MetaData:
                this.onMetaData(packet);
                break;
            case PacketType.VideoSeqHdr:
                this.onVideoSeqHdr(packet);
                break;
            case PacketType.AudioSeqHdr:
                this.onAudioSeqHdr(packet);
                break;
        }

        if (packet.type === PacketType.VideoFrame && !this.onConnectCalled) {
            this.onConnectCalled = true;
            this.events.onConnect();
        }
    }

    configureVideo(canvas: HTMLCanvasElement) {
        const offscreen = canvas.transferControlToOffscreen();
        this.video.channel.configure({ canvas: offscreen });
    }

    setAudioVolume(volume: number) {
        this.audio.setVolume(volume);
    }

    connect(url: string) {
        this.ws.connect(url);
    }

    disconnect() {
        this.ws.disconnect();
    }

    cleanup() {
        this.video.channel.close();
        this.audio.channel.close();
    }
}
