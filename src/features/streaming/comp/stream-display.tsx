import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { useSocket } from "@/lib/client/ws-main";
import { useCanvasStream } from "../hooks/use-stream";
import { streamStatus } from "../store";
import ControlPanel from "./control-panel";
import Preloader from "@ui/preloader";

type Props = {
    userId: number | null | undefined;
};

export default function StreamDisplay({ userId }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const status = useAtomValue(streamStatus);
    const { connect, disconnect } = useCanvasStream(canvasRef);
    const socket = useSocket();

    useEffect(() => {
        if (!userId) return;
        const unsub = socket.subscribe(`stream.${userId}.started`, () => connect(userId));
        connect(userId);
        return () => {
            disconnect();
            unsub();
        };
    }, [userId, connect, disconnect, socket]);

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
                    {(status === "idle" || status === "connecting") && (
                        <Preloader color="secondary" />
                    )}
                </div>
            )}
            <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef} />
            <ControlPanel canvasRef={canvasRef} />
        </div>
    );
}
