import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSetAtom, useStore } from "jotai";
import { WSStreaming } from "../lib/streaming";
import { streamStatus } from "../store";

type Context = {
    audioCtx: AudioContext | null;
    offscreen: OffscreenCanvas;
    offscreenCtx: OffscreenCanvasRenderingContext2D | null;
    canvasCtx: CanvasRenderingContext2D | null;
};

export function useCanvasStream(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    const store = useStore();
    const setStatus = useSetAtom(streamStatus);

    const [ctx] = useState<Context>(() => {
        const offscreen = new OffscreenCanvas(0, 0);
        return {
            audioCtx: null,
            offscreen,
            offscreenCtx: offscreen.getContext("2d"),
            canvasCtx: null,
        };
    });

    const onAudioData = (data: AudioData) => {
        if (!ctx.audioCtx) {
            ctx.audioCtx = new AudioContext();
        }

        const audioBuf = ctx.audioCtx.createBuffer(
            data.numberOfChannels,
            data.numberOfFrames,
            data.sampleRate
        );

        for (let i = 0; i < data.numberOfChannels; i++) {
            const channel = new Float32Array(data.numberOfFrames);
            data.copyTo(channel, { planeIndex: i });
            audioBuf.copyToChannel(channel, i);
        }
        const audioSrc = ctx.audioCtx.createBufferSource();
        audioSrc.buffer = audioBuf;
        audioSrc.connect(ctx.audioCtx.destination);
        audioSrc.start();
        data.close();
    };

    const onVideoFrame = (frame: VideoFrame) => {
        const canvas = canvasRef.current;
        if (!ctx.offscreenCtx || !ctx.canvasCtx || !canvas || !ctx.offscreen) return;
        ctx.offscreenCtx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        const bitmap = ctx.offscreen.transferToImageBitmap();
        ctx.canvasCtx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
    };

    const unmountedRef = useRef(false);
    useEffect(() => {
        unmountedRef.current = false;
        return () => {
            unmountedRef.current = true;
        };
    }, []);

    const [streaming] = useState(() => {
        return new WSStreaming({
            onVideoFrame,
            onAudioData,
            onConnect: () => setStatus("connected"),
            onDisconnect: () => setStatus(unmountedRef.current ? "idle" : "disconnected"),
            onConnecting: () => setStatus("connecting"),
        });
    });

    useEffect(() => {
        return store.sub(streamStatus, () => {
            const status = store.get(streamStatus);
            if (status === "disconnected" && canvasRef.current) {
                ctx.canvasCtx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        });
    }, [store, ctx, canvasRef]);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        ctx.canvasCtx = canvas?.getContext("2d") ?? null;
        if (!canvas) return;
        canvas.width = 1920;
        canvas.height = 1080;
        ctx.offscreen.width = canvas.width;
        ctx.offscreen.height = canvas.height;
    }, [canvasRef, ctx]);

    const connect = useCallback(
        (userId: number) =>
            streaming.connect(`ws://${location.hostname}:6767/ws/streams/${userId}`),
        [streaming]
    );

    const disconnect = useCallback(() => streaming.disconnect(), [streaming]);

    return { connect, disconnect };
}
