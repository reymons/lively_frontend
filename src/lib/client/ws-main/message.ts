import { InStreamMessage } from "./message/stream";

export type InboundMessages = InStreamMessage;

export type OutboundMessages = Record<string, unknown>;
