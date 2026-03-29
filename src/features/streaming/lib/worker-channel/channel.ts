import { UnknownError } from "./error";
import { Message } from "./message";

type MessageMap = Record<string | number, Record<string, any>>;

type TransferMap<M extends MessageMap> = {
    [K in keyof M]: (data: M[K]) => Transferable[];
};

export type OnMessage<M extends MessageMap> = <T extends keyof M>(mesg: Message<T, M[T]>) => void;

export type MessageHandlers<M extends MessageMap> = {
    [K in keyof M]: (data: M[K]) => void;
};

type WorkerChannelConfig<M extends MessageMap> = {
    transferMap: TransferMap<M>;
    onMessage?: OnMessage<M>;
    onError: (err: Error) => void;
};

const ExtendedTypes = Object.freeze({
    Error: 10000,
});

export type WorkerChannelExtConfig<M extends MessageMap> = Omit<
    WorkerChannelConfig<M>,
    "transferMap"
>;

const isWorker =
    typeof self !== "undefined" &&
    typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope;

export class WorkerChannel<Messages extends MessageMap> {
    private worker: Worker | null = null;
    private readonly conf: WorkerChannelConfig<Messages>;

    constructor(conf: WorkerChannelConfig<Messages>) {
        this.conf = { ...conf };

        if (isWorker) {
            self.onmessage = e => this.onMessage(e.data);
            self.onerror = err => this.onError(err);
        }
    }

    // We need to pass a worker directly otherwise Webpack won't be able to transpile .ts files
    open(worker: Worker) {
        this.worker = worker;
        this.worker.onmessage = e => this.onMessage(e.data);
        this.worker.onerror = e => this.onError(e.error);
    }

    private onError(err: unknown) {
        const error = err instanceof Error ? err : new UnknownError();
        this.conf.onError(error);
    }

    private onMessage(data: unknown) {
        try {
            const mesg = data as Message;
            if (mesg.type === ExtendedTypes.Error) this.onError(mesg.data.error);
            else this.conf.onMessage?.(mesg as Message<any, any>);
        } catch (err) {
            this.onError(err);
            return;
        }
    }

    private postMessage(data: any, transfer?: Transferable[]) {
        if (isWorker) self.postMessage(data, { transfer });
        else this.worker?.postMessage(data, { transfer });
    }

    protected sendMessage<T extends keyof Messages>(type: T, data: Messages[T]) {
        const getTransfer = this.conf.transferMap[type];
        const transfer = getTransfer(data);
        this.postMessage({ type, data }, transfer);
    }

    sendError(error: Error) {
        this.postMessage({ type: ExtendedTypes.Error, data: { error } });
    }

    close() {
        this.worker?.terminate();
    }
}
