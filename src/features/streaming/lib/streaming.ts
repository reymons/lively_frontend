import { MetaData, Packet, PacketType, WSMedia } from "@/lib/client/ws-media";

type Config = {
    onVideoFrame: (frame: VideoFrame) => void;
    onAudioData: (data: AudioData) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onConnecting?: () => void;
    onError?: (err: Error) => void;
};

export class WSStreaming {
    private ws: WSMedia;
    private conf: Config;
    private videoDecoder: VideoDecoder | null = null;
    private audioDecoder: AudioDecoder | null = null;
    private metaData = new MetaData();

    private gotAudioFrame = false;
    private gotVideoFrame = false;
    private onConnectCalled = false;

    constructor(conf: Config) {
        this.conf = { ...conf };

        this.ws = new WSMedia({
            onConnecting: this.conf.onConnecting,
            onError: this.conf.onError,
            onDisconnect: () => this.onDisconnect(),
            onPacket: p => this.onPacket(p),
        });
    }

    private onDisconnect() {
        this.gotAudioFrame = false;
        this.gotVideoFrame = false;
        this.onConnectCalled = false;
        this.conf.onDisconnect?.();
    }

    private bytesToHex(bytes: Uint8Array) {
        return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    }

    private createVideoDecoder(): VideoDecoder {
        return new VideoDecoder({
            output: frame => {
                if (this.ws.isOpen) this.conf.onVideoFrame(frame);
                frame.close();
            },
            error: e => {
                console.error(e);
                this.disconnect();
            },
        });
    }

    private createAudioDecoder(): AudioDecoder {
        return new AudioDecoder({
            output: data => {
                if (this.ws.isOpen) this.conf.onAudioData(data);
                data.close();
            },
            error: e => {
                console.error(e);
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

    private onVideoSeqHdr(packet: Packet) {
        const codec = `avc1.${this.bytesToHex(packet.data.subarray(1, 4))}`;
        console.log({ videoCodec: codec });
        this.videoDecoder = this.createVideoDecoder();
        this.videoDecoder.configure({ codec, description: packet.data });
    }

    onAudioFrame(packet: Packet) {
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
            numberOfChannels: 2,
            sampleRate: 48000,
        });
    }

    private onPacket(packet: Packet) {
        switch (packet.type) {
            case PacketType.VideoFrame:
                this.gotVideoFrame = true;
                this.onVideoFrame(packet);
                break;
            case PacketType.VideoSeqHdr:
                this.onVideoSeqHdr(packet);
                break;
            case PacketType.AudioFrame:
                this.gotAudioFrame = true;
                this.onAudioFrame(packet);
                break;
            case PacketType.AudioSeqHdr:
                this.onAudioSeqHdr(packet);
                break;
        }

        if (this.gotVideoFrame && !this.onConnectCalled) {
            this.onConnectCalled = true;
            this.conf.onConnect?.();
        }
    }

    connect(url: string) {
        this.ws.connect(url);
    }

    disconnect() {
        this.ws.disconnect();
    }
}
