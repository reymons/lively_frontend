import { useEffect, useState } from "react";
import { useSetAtom, useStore } from "jotai";
import { useEffectOnce } from "@/lib/hooks/use-effect-once";
import { audioVolume, streamStatus } from "../store";
import { SOCKET_CLIENT_BASE_URL } from "@/config/env";
import { StreamingAPI } from "../lib/streaming";

export function useCanvasStream(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    const store = useStore();
    const setStatus = useSetAtom(streamStatus);
    const setAudioVolume = useSetAtom(audioVolume);

    const [api] = useState(() => {
        return new StreamingAPI({
            initialAudioVolume: store.get(audioVolume),
            events: {
                onError: err => console.error(err),
                onConnect: () => setStatus("connected"),
                onDisconnect: () => setStatus("disconnected"),
                onConnecting: () => setStatus("connecting"),
                onAudioDisabled: () => setAudioVolume(0),
            },
        });
    });

    useEffect(() => {
        return store.sub(audioVolume, () => {
            api.setAudioVolume(store.get(audioVolume));
        });
    }, [store, api]);

    // We're using useEffectOnce because configureVideo() calls transferControlToOffscreen that can be called only once
    // Other soultion would be transfering the offscreen canvas back to the main thread upon closing the video channel
    // It's going to be a bunch of code for only one small thing which is not worth it
    useEffectOnce(() => {
        if (!canvasRef.current) return;
        api.configureVideo(canvasRef.current);
        return () => api.cleanup();
    });

    return useState(() => ({
        connect: (userId: number) => api.connect(`${SOCKET_CLIENT_BASE_URL}/ws/streams/${userId}`),
        disconnect: () => api.disconnect(),
    }))[0];
}
