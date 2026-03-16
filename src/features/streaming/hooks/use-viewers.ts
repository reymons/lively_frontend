import { useSocket } from "@/lib/client/ws-main";
import { useEffect, useState } from "react";

export function useViewers(userID: number | null | undefined) {
    const socket = useSocket();
    const [viewers, setViewers] = useState(0);

    useEffect(() => {
        if (!userID) return;
        return socket.subscribe(`stream.${userID}.viewers`, mesg => {
            setViewers(mesg.data.viewers);
        });
    }, [socket, userID]);

    return viewers;
}
