import { WritableStream, ReadableStream } from "node:stream/web";

// @ts-expect-error ignore
global.ReadableStream = ReadableStream;
// @ts-expect-error ignore
global.WritableStream = WritableStream;
