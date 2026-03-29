import { AudioService } from "./service";

class AudioProcessor extends AudioWorkletProcessor {
    private audioService: AudioService | null = null;

    constructor() {
        super();

        this.port.onmessage = e => this.onMessage(e.data);
    }

    private onMessage(data: any) {
        if (data.type === "configure") {
            this.audioService = AudioService.fromStructuredClone(data.data.audioService);
        }
    }

    // eslint-disable-next-line
    process(_: [], outputs: Float32Array[][], __: {}): boolean {
        if (this.audioService !== null) {
            const data = this.audioService.readChannels();

            if (data !== null) {
                for (let i = 0; i < data.channels.length; i++) {
                    const channelIn = data.channels[i];
                    const channelOut = outputs[0][i];

                    for (let j = 0, k = data.start; k < data.end; j++, k++) {
                        channelOut[j] = channelIn[k];
                    }
                }
            }
        }
        return true;
    }
}

registerProcessor("audio-processor", AudioProcessor);
