import { useParams } from "react-router";
import cn from "classnames";
import { useAtomValue } from "jotai";
import { useStreamKey } from "@/stores/stream-key";
import { useUser } from "@/stores/user";
import { numToKs, StreamDisplay, streamStatus, useViewers } from "@/features/streaming";
import { usePublicUser } from "@/stores/public-user";
import SecretDisplay from "@ui/secret-display";
import FlatIcon from "@ui/flat-icon";
import sl from "./stream.module.scss";

type Params = {
    username: string;
};

export default function StreamPage() {
    const params = useParams<Params>();
    const username = params.username || "";
    const { data: sk } = useStreamKey();
    const { data: user } = useUser();
    const { data: publicUser } = usePublicUser({ username });

    return (
        <main className="cnt">
            <div className={sl.main}>
                {!!sk && user?.username === username && (
                    <div className={sl.sk}>
                        <p className="fs-lg fsm-sm">Your streaming URL</p>
                        <SecretDisplay
                            base={`rtmps://${location.hostname}:1935/live/`}
                            secret={sk.stream_key}
                            visibleStart={6}
                            visibleEnd={5}
                        />
                    </div>
                )}
                <div className={sl.header}>
                    <Heading username={username} />
                    <Viewers userID={publicUser?.id} />
                </div>
                <StreamDisplay userId={publicUser?.id} />
            </div>
        </main>
    );
}

function Heading({ username }: { username: string }) {
    const status = useAtomValue(streamStatus);

    return (
        <h1 className={cn("fs-2xl fsm-md", sl.heading)}>
            {username}{" "}
            {status === "connected" ? (
                <>
                    is live
                    <span className={sl.live} />
                </>
            ) : (
                "is offline"
            )}
        </h1>
    );
}

function Viewers({ userID }: { userID: number | undefined }) {
    const viewers = useViewers(userID);

    return (
        <div className={sl.viewers} title="Viewer count">
            <span className="fs-lg fsm-md">{numToKs(viewers)}</span>
            <FlatIcon type="eye-target" color="var(--color-bg-secondary)" />
        </div>
    );
}
