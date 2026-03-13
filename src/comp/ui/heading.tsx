import FlatIcon from "./flat-icon";
import sl from "./heading.module.scss";

type Props = {
    children: React.ReactNode;
    withReturn?: boolean;
    onReturn?: () => void;
};

export default function Heading({ children, withReturn, onReturn }: Props) {
    return (
        <div className={sl.title}>
            {withReturn && (
                <button className="icon-btn" type="button" onClick={() => onReturn?.()}>
                    <FlatIcon type="arrow-left" color="var(--color-bg-secondary)" />
                </button>
            )}
            <h1>{children}</h1>
        </div>
    );
}
