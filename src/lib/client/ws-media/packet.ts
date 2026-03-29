export const PacketType = Object.freeze({
    VideoFrame: 0,
    VideoSeqHdr: 1,
    AudioFrame: 2,
    AudioSeqHdr: 3,
    MetaData: 4,
});

export class MetaData {
    private _videoWidth = 0;
    private _videoHeight = 0;
    private _videoFrameRate = 0;
    private _videoDataRate = 0;
    private _audioChannels = 0;
    private _audioSampleRate = 0;
    private _audioDataRate = 0;

    get videoWidth() {
        return this._videoWidth;
    }
    get videoHeight() {
        return this._videoHeight;
    }
    get videoFrameRate() {
        return this._videoFrameRate;
    }
    get videoDataRate() {
        return this._videoDataRate;
    }
    get audioChannels() {
        return this._audioChannels;
    }
    get audioSampleRate() {
        return this._audioSampleRate;
    }
    get audioDataRate() {
        return this._audioDataRate;
    }

    decode(data: Uint8Array<ArrayBuffer>) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        this._videoWidth = view.getUint16(0);
        this._videoHeight = view.getUint16(2);
        this._videoFrameRate = view.getUint8(4);
        this._videoDataRate = view.getUint16(5);
        this._audioChannels = view.getUint8(7);
        this._audioSampleRate = view.getUint32(8);
        this._audioDataRate = view.getUint16(12);
    }
}

export class Packet {
    private _type = 0;
    private _timestamp = 0;
    private _data: Uint8Array<ArrayBuffer> | null = null;
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

    decode(data: Uint8Array<ArrayBuffer>) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        const flags = view.getUint8(0);
        this._type = (flags & 0b11111110) >> 1;
        this._isKeyFrame = Boolean(flags & 0b00000001);
        this._timestamp = view.getUint32(1);
        this._data = data.subarray(5);
    }
}
