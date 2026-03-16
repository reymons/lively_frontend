import { SentError } from "./error";
import { Type, Data, decodeMessage, Message } from "./message";

type Listener<T extends Type | number | symbol, D extends Data> = T extends string
    ? (message: Message<T, D>) => void
    : never;

type EventMap = Record<string, any>;

type Listeners<T extends EventMap> = {
    [K in keyof T]?: Set<Listener<K, T[K]>>;
};

type Validator = (data: Record<string, unknown>) => void;

type Validators<T extends EventMap> = { [K in keyof T]?: Validator };

type SocketConfig<T extends EventMap> = {
    onError?: (err: Error) => void;
    validators?: Validators<T>;
    reconnectTimeout?: number;
};

type WithFields<T extends EventMap> = T & {
    error: { message: string };
};

const EvSubscribe = "subscribe";
const EvUnsubscribe = "unsubscribe";

export class Socket<
    Inbound extends EventMap,
    Out extends EventMap,
    In extends EventMap = WithFields<Inbound>,
> {
    private ws: WebSocket | null = null;
    private readonly listeners: Listeners<In> = {};

    private readonly reconnectTimeout: number;
    private reconnectTimeoutId = -1;

    private readonly validators: Validators<In>;
    private readonly onErrorHandler?: (err: Error) => void;

    private readonly subCount: { [K in keyof In]?: number } = {};
    private qsubs: Record<string, boolean> = {};

    constructor(conf: SocketConfig<In>) {
        this.onErrorHandler = conf.onError;
        this.reconnectTimeout = conf.reconnectTimeout || 5;
        this.validators = conf.validators ? { ...conf.validators } : {};
    }

    private reportError(err: unknown) {
        let e: Error;
        if (err instanceof Error) {
            e = err;
        } else {
            e = new Error("Unknown error");
        }
        this.onErrorHandler?.(e);
    }

    private get isSocketOpen() {
        return !!this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    off<E extends keyof In>(ev: E, ln: Listener<E, In[E]>) {
        const set = this.listeners[ev];
        if (set) {
            set.delete(ln);
            if (set.size == 0) {
                delete this.listeners[ev];
            }
        }
    }

    on<E extends keyof In>(ev: E, ln: Listener<E, In[E]>): () => void {
        let set = this.listeners[ev];
        if (!set) {
            set = new Set();
            this.listeners[ev] = set;
        }
        set.add(ln);
        return () => this.off(ev, ln);
    }

    private emit<E extends keyof In>(ev: E, mesg: Message<string, In[E]>) {
        this.listeners[ev]?.forEach(ln => ln(mesg));
    }

    send<E extends keyof Out>(ev: E, data: Out[E]) {
        if (!this.isSocketOpen) return;

        try {
            const mesg = new Message(ev as string, data);
            this.ws!.send(JSON.stringify(mesg));
        } catch (err) {
            this.reportError(err);
        }
    }

    private sendSubMessage(ev: string, topic: string) {
        this.send(ev, { topic } as any);
    }

    subscribe<E extends keyof In>(ev: E, ln: Listener<E, In[E]>) {
        const event = ev as string;
        const off = this.on(ev, ln);

        const count = this.subCount[ev] ?? 0;
        if (count === 0) {
            if (this.isSocketOpen) {
                this.sendSubMessage(EvSubscribe, event);
            } else {
                this.qsubs[event] = true;
            }
        }
        this.subCount[ev] = count + 1;

        return () => {
            off();

            const count = Math.max(0, (this.subCount[ev] ?? 0) - 1);
            if (count === 0) {
                delete this.subCount[ev];
                if (ev in this.qsubs) delete this.qsubs[event];
                else this.sendSubMessage(EvUnsubscribe, event);
            } else {
                this.subCount[ev] = count;
            }
        };
    }

    private onMessage(data: any) {
        try {
            const mesg = new Message("", {});
            decodeMessage(mesg, data);

            const validator = this.validators[mesg.type];
            validator?.(mesg.data);

            this.emit(mesg.type, mesg as Message<any, any>);
        } catch (err) {
            this.reportError(err);
        }
    }

    private onClose(url: string) {
        this.reconnectTimeoutId = setTimeout(() => {
            this.reconnectTimeoutId = -1;
            this.connect(url);
        }, this.reconnectTimeout) as any as number;
    }

    private onOpen() {
        for (const event in this.qsubs) {
            this.sendSubMessage(EvSubscribe, event);
        }
        this.qsubs = {};
    }

    connect(url: string) {
        if (
            this.ws &&
            (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)
        ) {
            console.warn(
                "[SOCKET] An attempt to connect while connection is in progress or already established"
            );
            return;
        }

        clearTimeout(this.reconnectTimeoutId);

        const ws = new WebSocket(url);
        this.ws = ws;

        ws.onmessage = e => this.onMessage(e.data);
        ws.onopen = () => this.onOpen();

        const off = this.on("error", mesg => {
            this.reportError(new SentError(mesg.data.message));
        });
        ws.onclose = () => {
            off();
            this.onClose(url);
        };
    }

    disconnect() {
        this.ws?.close();
    }
}
