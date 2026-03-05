import {
    useImperativeHandle,
    useRef,
    useState,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { createPortal } from "react-dom";

export type ModalControl = {
    open: () => void;
    close: () => void;
    toggle: () => void;
};

type ModalControlWithState = ModalControl & {
    isOpen: boolean;
};

type CloseHandler = (done: () => void) => void;

const ModalContext = createContext<null | {
    modal: ModalControl;
    setCloseHandler: (handler: CloseHandler) => void;
}>(null);

export function useModalContext() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("Wrap your components in ModalContext");
    return ctx;
}

let modalRoot: HTMLElement | null = null;

export function setModalRoot(root: HTMLElement | null) {
    modalRoot = root;
}

export type ModalProps = {
    children?: React.ReactNode | ((control: ModalControl) => React.ReactNode);
    // Modal controls
    // Use useModal().ref or useModalState().ref
    ref: React.Ref<ModalControl>;
    // Open a modal on mount instantly
    defaultOpen?: boolean;
    // Specify a custom root
    root?: HTMLElement | null;
    // Events
    onClose?: () => void;
};

export type ModalExtProps = Omit<ModalProps, "children">;

export const Modal = ({ ref, defaultOpen = false, root = null, children, onClose }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const isOpenRef = useRef(isOpen);
    const isClosingRef = useRef(false);
    const closeHandlerRef = useRef<CloseHandler | null>(null);
    const isModalState = typeof ref === "function";
    root = root ?? modalRoot;

    const control = useMemo(
        () => ({
            open: () => {
                setIsOpen(true);
                isOpenRef.current = true;
            },
            close: () => {
                if (!isClosingRef.current) {
                    const finalize = () => {
                        isClosingRef.current = false;
                        isOpenRef.current = false;
                        setIsOpen(false);
                        onClose?.();
                    };

                    isClosingRef.current = true;
                    const closeHandler = closeHandlerRef.current;
                    if (closeHandler) closeHandler(finalize);
                    else finalize();
                }
            },
            toggle: () => {
                if (isOpenRef.current) control.close();
                else control.open();
            },
        }),
        [onClose]
    );

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "visible";

        return () => {
            document.body.style.overflow = "visible";
        };
    }, [isOpen]);

    useImperativeHandle(
        ref,
        () => ({ isOpen, ...control }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isModalState ? [isOpen, control] : [control]
    );

    if (!root) {
        throw new Error("Modal root is null. Set it via setModalRoot() or specify the `root` prop");
    }

    if (!isOpen) return null;

    return createPortal(
        <ModalContext
            value={{
                modal: control,
                setCloseHandler: handler => {
                    closeHandlerRef.current = handler;
                },
            }}
        >
            {typeof children === "function" ? children(control) : children}
        </ModalContext>,
        root
    );
};

export function useModal() {
    const ref = useRef<ModalControl | null>(null);

    return useState(() => ({
        ref,
        open: () => ref.current?.open(),
        close: () => ref.current?.close(),
        toggle: () => ref.current?.toggle(),
    }))[0];
}

export function useModalState() {
    const [modal, setModal] = useState<ModalControlWithState | null>(null);

    return {
        ref: setModal,
        isOpen: !!modal?.isOpen,
        open: () => modal?.open(),
        close: () => modal?.close(),
        toggle: () => modal?.toggle(),
    };
}
