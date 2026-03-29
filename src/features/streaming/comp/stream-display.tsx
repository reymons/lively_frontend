import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { useSocket } from "@/lib/client/ws-main";
import { useCanvasStream } from "../hooks/use-canvas-stream";
import { streamStatus } from "../store";
import ControlPanel from "./control-panel/control-panel";
import Preloader from "@ui/preloader";

type Props = {
    userId: number | null | undefined;
};

export default function StreamDisplay({ userId }: Props) {
    const status = useAtomValue(streamStatus);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stream = useCanvasStream(canvasRef);
    const socket = useSocket();

    useEffect(() => {
        if (!userId) return;
        const unsub = socket.subscribe(`stream.${userId}.started`, () => stream.connect(userId));
        stream.connect(userId);
        return () => {
            stream.disconnect();
            unsub();
        };
    }, [userId, stream, socket]);

    return (
        <div
            style={{
                aspectRatio: "16 / 9",
                position: "relative",
                overflow: "hidden",
                borderRadius: "10px",
            }}
        >
            {status !== "connected" && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgb(255 255 255 / 12.5%)",
                    }}
                >
                    {status === "connecting" && <Preloader color="secondary" />}
                </div>
            )}
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
            <ControlPanel canvasRef={canvasRef} />
        </div>
    );
}
