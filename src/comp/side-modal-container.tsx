import { useModalContext } from "@/lib/modal";
import { useRef } from "react";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import sl from "./side-modal-container.module.scss";

type Props = {
    children: React.ReactNode;
    top: string;
    backgroundColor: string;
};

const animDuration = 300;

export default function SideModalContainer({ children, top, backgroundColor }: Props) {
    const { modal, setCloseHandler } = useModalContext();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cntRef = useRef<HTMLDivElement>(null);

    setCloseHandler(done => {
        wrapperRef.current?.classList.add(sl.closing!);
        setTimeout(() => done(), animDuration);
    });

    useOutsideClick({
        isOpen: true,
        ref: cntRef,
        onClick: () => modal.close(),
    });

    return (
        <div
            className={sl.wrapper}
            style={{ top, "--anim-duration": `${animDuration}ms` } as React.CSSProperties}
            ref={wrapperRef}
        >
            <div ref={cntRef} style={{ backgroundColor }}>
                {children}
            </div>
        </div>
    );
}
