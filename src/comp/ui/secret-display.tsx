import { useMemo, useState } from "react";
import cn from "classnames";
import { obscure } from "@/lib/string";
import FlatIcon from "./flat-icon";
import CopyButton from "./copy-button";
import sl from "./secret-display.module.scss";

type Props = {
    base: string;
    secret: string;
    visibleStart: number;
    visibleEnd: number;
};

export default function SecretDisplay({ base, secret, visibleStart, visibleEnd }: Props) {
    const [secretVisible, setSecretVisible] = useState(false);

    const obscuredSecret = useMemo(
        () => obscure(secret, visibleStart, visibleEnd),
        [secret, visibleStart, visibleEnd]
    );

    return (
        <div className={cn(sl.wrapper, "fsm-sm")}>
            <div className={sl.value}>
                {base}
                {secretVisible ? secret : obscuredSecret}
            </div>
            <div className={sl.icons}>
                <button className="icon-btn" onClick={() => setSecretVisible(p => !p)}>
                    <FlatIcon
                        type={secretVisible ? "eye-crossed" : "eye"}
                        color="var(--color-bg-secondary)"
                    />
                </button>
                <CopyButton text={base + secret} />
            </div>
        </div>
    );
}
