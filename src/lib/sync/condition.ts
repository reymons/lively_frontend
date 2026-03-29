import { AtomicInt32, symGetBuffer } from "./atomic";

export class Condition {
    static fromStructuredClone(value: Condition) {
        const result = { ...value } as Condition;
        Object.setPrototypeOf(result, Condition.prototype);
        result.cond = AtomicInt32.fromStructuredClone(result.cond);
        return result;
    }

    private cond: AtomicInt32;

    constructor() {
        this.cond = new AtomicInt32(1);
    }

    wait() {
        Atomics.wait(this.cond[symGetBuffer](), 0, 1);
    }

    notify(count?: number) {
        Atomics.notify(this.cond[symGetBuffer](), 0, count);
    }
}
