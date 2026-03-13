import { useState } from "react";
import cn from "classnames";
import { px2rem } from "@/lib/css";
import FlatIcon from "@ui/flat-icon";
import { Input } from "../input";
import sl from "./password-input.module.scss";

type Props = PartialBy<
    Omit<React.ComponentProps<typeof Input.WithSideContent>, "type">,
    "side" | "pr"
>;

export const PasswordInput = ({ side, pr, ...rest }: Props) => {
    const [visible, setVisible] = useState(false);

    return (
        <Input.WithSideContent
            {...rest}
            pr={pr ?? `${px2rem(54)}rem`}
            type={visible ? "text" : "password"}
            side={
                <>
                    {side}
                    <button
                        className="icon-btn"
                        type="button"
                        aria-pressed={visible}
                        aria-label={visible ? "Hide password" : "Show password"}
                        onClick={() => setVisible(f => !f)}
                    >
                        <FlatIcon type={visible ? "lock-unlocked" : "lock"} />
                    </button>
                </>
            }
        />
    );
};

type WithRecoverProps = Omit<Props, "side"> & {
    onRecover: () => void;
};

const WithRecover: React.FC<WithRecoverProps> = ({ onRecover, ...rest }) => {
    return (
        <PasswordInput
            {...rest}
            pr={`${px2rem(120)}rem`}
            side={
                <div>
                    <span className="text-hint">|</span>
                    <button
                        className={cn("inline-clickable", sl.recoverBtn)}
                        type="button"
                        onClick={onRecover}
                        aria-label="Recover password"
                    >
                        Forgot?
                    </button>
                </div>
            }
        />
    );
};

WithRecover.displayName = "PasswordInput.WithRecover";

PasswordInput.WithRecover = WithRecover;
