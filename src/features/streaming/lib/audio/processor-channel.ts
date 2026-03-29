import { WorkerChannel, WorkerChannelExtConfig } from "../worker-channel";
import { AudioService } from "./service";

type ConfigureData = {
    audioService: AudioService;
};

type AudioDataData = {
    audioData: AudioData;
};

export const MessageType = Object.freeze({
    AudioData: 0,
    Configure: 1,
});

export type Messages = {
    [MessageType.AudioData]: AudioDataData;
    [MessageType.Configure]: ConfigureData;
};

export class AudioProcessorChannel extends WorkerChannel<Messages> {
    constructor(conf: WorkerChannelExtConfig<Messages>) {
        super({
            ...conf,
            transferMap: {
                [MessageType.AudioData]: data => [data.audioData],
                [MessageType.Configure]: () => [],
            },
        });
    }

    sendAudioData(audioData: AudioData) {
        this.sendMessage(MessageType.AudioData, { audioData });
    }

    configure(data: ConfigureData) {
        this.sendMessage(MessageType.Configure, data);
    }
}
