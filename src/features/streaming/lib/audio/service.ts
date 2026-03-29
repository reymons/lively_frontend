import { AtomicInt, AtomicUint8 } from "@/lib/sync";

type Config = {
    framesPerChannel: number;
    totalChannels: number;
};

// AudioService represents a bridge that allows communication between processor worker and its worklet via shared buffers
// It uses a pool of channels, each consisting of `totalChannels` float32 arrays
// Since the worklet reads only 128 frames per channel (which we call a 'chunk') at a time,
// AudioService reads the current pair of channels in the pool in chunks (i.e. 128 frames per channel)
// unitl done and only then moves the read pointer
export class AudioService {
    private static readonly chunkSize = 128;

    static fromStructuredClone(v: AudioService) {
        const result = { ...v } as AudioService;
        Object.setPrototypeOf(result, AudioService.prototype);
        result.wr = AtomicInt.fromStructuredClone(result.wr);
        result.rd = AtomicInt.fromStructuredClone(result.rd);
        result.chunkIdx = AtomicInt.fromStructuredClone(result.chunkIdx);
        return result;
    }

    private wr: AtomicUint8;
    private rd: AtomicUint8;
    private chunkIdx: AtomicUint8;

    private readonly pool: Float32Array[][];
    private readonly virtualPoolSize: number;
    private readonly totalChannels: number;
    private readonly maxChunkIdx: number;

    constructor(conf: Config) {
        this.totalChannels = conf.totalChannels;
        this.maxChunkIdx = conf.framesPerChannel / AudioService.chunkSize;

        const poolSize = 8;
        this.pool = new Array(poolSize);
        this.virtualPoolSize = poolSize + 1;

        for (let i = 0; i < poolSize; i++) {
            this.pool[i] = new Array(this.totalChannels);

            for (let j = 0; j < this.totalChannels; j++) {
                const size = conf.framesPerChannel * Float32Array.BYTES_PER_ELEMENT;
                const shared = new SharedArrayBuffer(size);
                this.pool[i][j] = new Float32Array(shared);
            }
        }

        this.wr = new AtomicUint8(0);
        this.rd = new AtomicUint8(0);
        this.chunkIdx = new AtomicUint8(0);
    }

    private isBufferFull() {
        return (this.wr.value() + 1) % this.virtualPoolSize === this.rd.value();
    }

    private isBufferEmpty() {
        return this.wr.value() === this.rd.value();
    }

    readChannels() {
        if (this.isBufferEmpty()) return null;

        const rd = this.rd.value() % this.pool.length;
        const channels = this.pool[rd];

        let chunkIdx = this.chunkIdx.value();
        const start = chunkIdx * AudioService.chunkSize;
        const end = start + AudioService.chunkSize;

        chunkIdx += 1;
        if (chunkIdx >= this.maxChunkIdx) {
            this.rd.setValue((rd + 1) % this.virtualPoolSize);
        }
        this.chunkIdx.setValue(chunkIdx % this.maxChunkIdx);

        return { channels, start, end };
    }

    writeAudioData(audioData: AudioData): boolean {
        if (this.isBufferFull()) return false;

        const wr = this.wr.value() % this.pool.length;
        const channels = this.pool[wr];

        for (let i = 0; i < this.totalChannels; i++) {
            audioData.copyTo(channels[i], { planeIndex: i, format: "f32-planar" });
        }

        this.wr.setValue((wr + 1) % this.virtualPoolSize);
        return true;
    }
}
