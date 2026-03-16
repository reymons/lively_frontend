import { Packet } from "./packet";

export type OnPacketCallback = (packet: Packet) => void;

type Config = {
    onPacket: (packet: Packet) => void;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onConnecting?: () => void;
    onError?: (err: Error) => void;
};

export class WSMedia {
    private ws: WebSocket | null = null;
    private readonly conf: Config;

    constructor(conf: Config) {
        this.conf = { ...conf };
    }

    get isOpen() {
        return !!this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    get isClosed() {
        return !this.ws || this.ws.readyState === WebSocket.CLOSED;
    }

    connect(url: string) {
        if (
            this.ws &&
            (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)
        ) {
            return;
        }

        const ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        this.ws = ws;

        this.conf.onConnecting?.();

        ws.onopen = () => {
            this.conf.onConnect?.();
        };

        ws.onmessage = e => {
            const packet = new Packet();
            packet.decode(new Uint8Array(e.data));
            this.conf.onPacket(packet);
        };

        ws.onclose = e => {
            if (!e.wasClean) {
                const err = new Error(
                    `WebSocket connection closed. Reason: ${e.reason}. Code: ${e.code}`
                );
                this.conf.onError?.(err);
            }
            // make sure there's no new connection
            if (this.isClosed) {
                this.conf.onDisconnect?.();
            }
        };
    }

    disconnect() {
        this.ws?.close();
    }
}
