import "./flat-icon.scss";

type FlatIconType = "arrow-left";

type Props = {
    type: FlatIconType;
    color?: string;
    style?: React.CSSProperties;
};

export default function FlatIcon({ type, color, style }: Props) {
    return (
        <svg
            className="flat-icon"
            style={{
                ...style,
                ...(color ? { "--color-flat-icon": color } : undefined),
            }}
        >
            <use href={`${require("@/assets/preloaded/icons/flat.svg")}#${type}`} />
        </svg>
    );
}
