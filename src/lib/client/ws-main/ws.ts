import { createContext, createElement, useContext } from "react";
import { Socket } from "../socket";
import { InboundMessages, OutboundMessages } from "./message";
import { SOCKET_CLIENT_BASE_URL } from "@/config/env";

const socket = new Socket<InboundMessages, OutboundMessages>({
    onError: err => console.error(err),
});

socket.connect(`${SOCKET_CLIENT_BASE_URL}/ws/main`);

const SocketContext = createContext<typeof socket | null>(null);

export function useSocket() {
    const ctx = useContext(SocketContext);
    if (!ctx) {
        throw new Error("No context. Wrap the application in SocketContext");
    }
    return ctx;
}

type Props = {
    children: React.ReactNode;
};

export function SocketProvider({ children }: Props) {
    return createElement(SocketContext, { value: socket }, children);
}
