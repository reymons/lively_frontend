import useTimeoutCallback from "@/lib/hooks/use-timeout-callback";
import FlatIcon from "./flat-icon";

type Props = {
    text: string;
};

export default function CopyButton({ text }: Props) {
    const [copy, disabled] = useTimeoutCallback(() => {
        navigator.clipboard.writeText(text);
    }, 1000);

    return (
        <button className="icon-btn" disabled={disabled} onClick={copy}>
            <FlatIcon
                type="copy"
                color={disabled ? "var(--color-success)" : "var(--color-bg-secondary)"}
            />
        </button>
    );
}
