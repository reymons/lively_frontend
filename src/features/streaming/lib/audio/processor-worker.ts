import { AudioService } from "./service";
import { AudioProcessorChannel, Messages, MessageType } from "./processor-channel";
import { MessageHandlers } from "../worker-channel";

let audioService: AudioService | null = null;

const handlers: MessageHandlers<Messages> = {
    [MessageType.Configure]: data => {
        audioService = AudioService.fromStructuredClone(data.audioService);
    },
    [MessageType.AudioData]: data => {
        if (audioService !== null) {
            audioService.writeAudioData(data.audioData);
        }
        data.audioData.close();
    },
};

new AudioProcessorChannel({
    onMessage: mesg => handlers[mesg.type](mesg.data),
    onError: err => console.error(err),
});
