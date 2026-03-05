import { EventEmitter } from "./emitter";

let emitter: EventEmitter;

beforeEach(() => {
    emitter = new EventEmitter();
});

test("emits event with correct data", () => {
    const event = "bla-bla";
    const data = { a: 1, b: "2", c: [1, 2] };
    const handler = (eventData: unknown) => {
        expect(eventData).toStrictEqual(data);
    };
    const off = emitter.on(event, handler);
    emitter.emit(event, data);
    off();
});

test("calls multiple listeners of same event", () => {
    const event = "ddd";
    const handlers = [];
    for (let i = 0; i < 5; i++) {
        const handler = jest.fn();
        emitter.on(event, handler);
        handlers.push(handler);
    }
    emitter.emit(event, null);
    handlers.forEach(h => expect(h).toHaveBeenCalledTimes(1));
});

test("emits same data for listeners of same event", () => {
    const event = "bbb";
    const data = [1, 2, 3];
    for (let i = 0; i < 5; i++) {
        emitter.on(event, eventData => {
            expect(eventData).toStrictEqual(data);
        });
    }
    emitter.emit(event, data);
});

test("removes listener when calling off() returned by on()", () => {
    const event = "bbb";
    const handler = jest.fn();
    const off = emitter.on(event, handler);
    off();
    emitter.emit(event, null);
    expect(handler).toHaveBeenCalledTimes(0);
});

test("removes listener when calling off() directly", () => {
    const event = "bbb";
    const handler = jest.fn();
    emitter.on(event, handler);
    emitter.off(event, handler);
    emitter.emit(event, { a: 1 });
    expect(handler).toHaveBeenCalledTimes(0);
});

test("allows to call off() multiple times of the same on() call", () => {
    const off = emitter.on("abc", () => {});
    expect(() => {
        off();
        off();
        off();
    }).not.toThrow();
});

test("allows to call off() multiple times on the same event", () => {
    const listener = () => {};
    const event = "abc";
    emitter.on(event, listener);
    expect(() => {
        emitter.off(event, listener);
        emitter.off(event, listener);
        emitter.off(event, listener);
        emitter.off(event, listener);
    }).not.toThrow();
});
