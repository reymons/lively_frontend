import { atom } from "jotai";

type StreamStatus = "connected" | "disconnected" | "connecting";

export const streamStatus = atom<StreamStatus>("disconnected");

const rawAudioVolume = atom(0.5);

export const audioVolume = atom(
    get => get(rawAudioVolume),
    (_, set, value: number) => {
        set(rawAudioVolume, Math.max(0, Math.min(1, value)));
    }
);

export const isAudioMuted = atom(get => get(audioVolume) === 0);
