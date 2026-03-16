import { atom } from "jotai";

type StreamStatus = "connected" | "disconnected" | "connecting" | "idle";

export const streamStatus = atom<StreamStatus>("idle");
