export const PacketType = Object.freeze({
    VideoFrame: 0,
    VideoSeqHdr: 1,
    AudioFrame: 2,
    AudioSeqHdr: 3,
    MetaData: 4,
});

export class MetaData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decode(data: Uint8Array) {}
}

export class Packet {
    private _type = 0;
    private _timestamp = 0;
    private _data: Uint8Array | null = null;
    private _isKeyFrame = false;

    get type() {
        return this._type;
    }

    get timestamp() {
        return this._timestamp;
    }

    get data() {
        return this._data ?? new Uint8Array();
    }

    get isKeyFrame() {
        return this._isKeyFrame;
    }

    decode(data: Uint8Array) {
        const view = new DataView(data.buffer);
        const flags = view.getUint8(0);
        this._type = (flags & 0b11111110) >> 1;
        this._isKeyFrame = Boolean(flags & 0b00000001);
        this._timestamp = view.getUint32(1);
        this._data = data.subarray(5);
    }
}
