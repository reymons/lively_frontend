import { useRef } from "react";
import { PrimaryContainer } from "@ui/primary-container";
import { useModalContext } from "@/lib/modal";
import { useOutsideClick } from "@/lib/hooks/use-outside-click";
import sl from "./main-modal-container.module.scss";

type Props = Omit<React.ComponentProps<typeof PrimaryContainer>, "ref"> & {
    children: React.ReactNode;
};

const animDuration = 300;

export default function MainModalContainer({ children, ...rest }: Props) {
    const { modal, setCloseHandler } = useModalContext();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cntRef = useRef<HTMLDivElement>(null);

    setCloseHandler(done => {
        wrapperRef.current?.classList.add(sl.closing!);
        setTimeout(done, animDuration);
    });

    useOutsideClick({
        isOpen: true,
        ref: cntRef,
        onClick: () => modal.close(),
    });

    return (
        <div
            className={sl.wrapper}
            ref={wrapperRef}
            style={{ "--anim-duration": `${animDuration}ms` } as React.CSSProperties}
        >
            <PrimaryContainer ref={cntRef} {...rest}>
                {children}
            </PrimaryContainer>
        </div>
    );
}
