type IntArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array;

type IntConstructor<T extends IntArray> = {
    new (size: number): T;
    readonly BYTES_PER_ELEMENT: number;
};

export const symGetBuffer = Symbol("getBuffer");

export class AtomicInt<T extends IntArray> {
    static fromStructuredClone<T extends IntArray>(value: AtomicInt<T>) {
        const result = { ...value } as AtomicInt<T>;
        Object.setPrototypeOf(result, AtomicInt.prototype);
        return result;
    }

    private readonly buffer: T;

    constructor(Ctor: IntConstructor<T>, num: number) {
        const shared = new SharedArrayBuffer(Ctor.BYTES_PER_ELEMENT);
        this.buffer = new Ctor(shared as any);
        this.buffer[0] = num;
    }

    protected [symGetBuffer]() {
        return this.buffer;
    }

    value() {
        return Atomics.load(this.buffer, 0);
    }

    setValue(num: number) {
        return Atomics.store(this.buffer, 0, num);
    }
}

export class AtomicInt8 extends AtomicInt<Int8Array> {
    constructor(n: number) {
        super(Int8Array, n);
    }
}
export class AtomicInt16 extends AtomicInt<Int16Array> {
    constructor(n: number) {
        super(Int16Array, n);
    }
}
export class AtomicInt32 extends AtomicInt<Int32Array> {
    constructor(n: number) {
        super(Int32Array, n);
    }
}
export class AtomicUint8 extends AtomicInt<Uint8Array> {
    constructor(n: number) {
        super(Uint8Array, n);
    }
}
export class AtomicUint16 extends AtomicInt<Uint16Array> {
    constructor(n: number) {
        super(Uint16Array, n);
    }
}
export class AtomicUint32 extends AtomicInt<Uint32Array> {
    constructor(n: number) {
        super(Uint32Array, n);
    }
}

export class AtomicBool {
    static fromStructuredClone(value: AtomicBool) {
        const result = { ...value } as AtomicBool;
        Object.setPrototypeOf(result, AtomicBool.prototype);
        result.atomic = AtomicInt.fromStructuredClone(result.atomic);
        return result;
    }

    private atomic: AtomicUint8;

    constructor(flag: boolean) {
        this.atomic = new AtomicUint8(Number(flag));
    }

    value(): boolean {
        return this.atomic.value() === 1;
    }

    setValue(flag: boolean): boolean {
        return this.atomic.setValue(Number(flag)) === 1;
    }
}
