import { WorkerChannel, WorkerChannelExtConfig } from "../worker-channel";

type ConfigureData = {
    canvas: OffscreenCanvas;
};

type MetaData = {
    width: number;
    height: number;
};

type FrameData = {
    frame: VideoFrame;
};

type ClearScreenData = object;

export const MessageType = Object.freeze({
    Frame: 0,
    Configure: 1,
    ClearScreen: 2,
    MetaData: 3,
});

export type Messages = {
    [MessageType.Frame]: FrameData;
    [MessageType.Configure]: ConfigureData;
    [MessageType.ClearScreen]: ClearScreenData;
    [MessageType.MetaData]: MetaData;
};

export class VideoRenderChannel extends WorkerChannel<Messages> {
    constructor(conf: WorkerChannelExtConfig<Messages>) {
        super({
            ...conf,
            transferMap: {
                [MessageType.Frame]: data => [data.frame],
                [MessageType.Configure]: data => [data.canvas],
                [MessageType.ClearScreen]: () => [],
                [MessageType.MetaData]: () => [],
            },
        });
    }

    configure(data: ConfigureData) {
        this.sendMessage(MessageType.Configure, data);
    }

    clearScreen() {
        this.sendMessage(MessageType.ClearScreen, {});
    }

    sendFrame(frame: VideoFrame) {
        this.sendMessage(MessageType.Frame, { frame });
    }

    sendMetaData(meta: MetaData) {
        this.sendMessage(MessageType.MetaData, meta);
    }
}
