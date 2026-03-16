import { InvalidMessageError } from "./error";

export type Type = string;
export type Data = Record<string, unknown>;

export class Message<T extends Type = Type, D extends Data = Data> {
    type: T;
    data: D;

    constructor(type: T, data: D) {
        this.type = type;
        this.data = data;
    }
}

export function decodeMessage(mesg: Message, data: any) {
    const parsed = JSON.parse(data) as unknown;

    if (typeof parsed !== "object" || parsed == null) {
        throw new InvalidMessageError("Not an object");
    }
    if (!("type" in parsed) || typeof parsed.type !== "string") {
        throw new InvalidMessageError("Property 'type' is not a string");
    }
    if (!("data" in parsed) || typeof parsed.data !== "object" || parsed.data === null) {
        throw new InvalidMessageError("Property 'data' is not an object");
    }

    mesg.type = parsed.type;
    mesg.data = parsed.data as Data;
}
