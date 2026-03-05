import userEvent from "@testing-library/user-event";
import { act, useImperativeHandle } from "react";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import {
    Modal,
    ModalControl,
    useModal,
    useModalContext,
    useModalState,
    type ModalProps,
} from "./modal";

const modalContentId = "target";

type AppProps = {
    modalProps?: Partial<ModalProps>;
};

const App = ({ modalProps }: AppProps) => {
    const modal = useModal();
    const content = modalProps?.children ?? <div data-testid={modalContentId} />;

    return (
        <>
            <Modal ref={modal.ref} root={document.body} {...modalProps}>
                {content}
            </Modal>
            <button data-testid="open" onClick={() => modal.open()} />
            <button data-testid="close" onClick={() => modal.close()} />
            <button data-testid="toggle" onClick={() => modal.toggle()} />
        </>
    );
};

const openModal = () => userEvent.click(screen.getByTestId("open"));
const closeModal = () => userEvent.click(screen.getByTestId("close"));
const toggleModal = () => userEvent.click(screen.getByTestId("toggle"));

const control = {
    openHandler: jest.fn(),
    closeHandler: jest.fn(),
    toggleHandler: jest.fn(),
};

const Control = ({ ref }: { ref: React.Ref<ModalControl> }) => {
    useImperativeHandle(ref, () => ({
        isOpen: false,
        open: control.openHandler,
        close: control.closeHandler,
        toggle: control.toggleHandler,
    }));

    return null;
};

afterEach(() => {
    jest.clearAllMocks();
});

describe("Modal", () => {
    it("opens modal at the specified root", async () => {
        render(<App />);
        await openModal();
        expect(screen.getByTestId(modalContentId)).toBeInTheDocument();
    });

    it("closes modal at the specified root", async () => {
        render(<App />);
        await openModal();
        expect(screen.getByTestId(modalContentId)).toBeInTheDocument();
        await closeModal();
        expect(screen.queryByTestId(modalContentId)).toBe(null);
    });

    it("toggles modal at the specified root", async () => {
        render(<App />);
        await toggleModal();
        expect(screen.getByTestId(modalContentId)).toBeInTheDocument();
        await toggleModal();
        expect(screen.queryByTestId(modalContentId)).toBe(null);
    });

    it("sets 'overflow hidden' for body if modal is open", async () => {
        render(<App />);
        expect(document.body).toHaveStyle({ overflow: "visible" });
        await openModal();
        expect(document.body).toHaveStyle({ overflow: "hidden" });
    });

    it("sets 'overflow visible' for body if modal is closed", async () => {
        render(<App />);
        await closeModal();
        expect(document.body).toHaveStyle({ overflow: "visible" });
    });

    it("calls close handler if modal is being closed", async () => {
        const closeHandler = jest.fn();
        const Content = () => {
            const { setCloseHandler } = useModalContext();
            setCloseHandler(closeHandler);
            return <></>;
        };

        render(<App modalProps={{ children: <Content /> }} />);
        await openModal();
        await closeModal();
        expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it("closes modal if the passed to close handler function has been called", async () => {
        const closeHandler = jest.fn(done => done());
        const Content = () => {
            const { setCloseHandler } = useModalContext();
            setCloseHandler(closeHandler);
            return <div data-testid="target" />;
        };

        render(<App modalProps={{ children: <Content /> }} />);
        await openModal();
        await closeModal();
        await waitFor(() => {
            expect(screen.queryByTestId("target")).toBe(null);
        });
    });

    it("shows a modal instantly if defaultOpen is set to 'true'", () => {
        render(<App modalProps={{ defaultOpen: true }} />);
        expect(screen.queryByTestId(modalContentId)).toBeInTheDocument();
    });

    it("renders a modal at the specified 'root' prop", () => {
        const root = document.createElement("div");
        document.body.append(root);
        render(<App modalProps={{ root, defaultOpen: true }} />);
        const content = screen.getByTestId(modalContentId);
        expect(root.firstElementChild).toBe(content);
        root.remove();
    });

    it("renders children as function", () => {
        render(
            <App
                modalProps={{
                    defaultOpen: true,
                    children: () => <div data-testid="target" />,
                }}
            />
        );
        expect(screen.getByTestId("target")).toBeInTheDocument();
    });
});

describe("useModalContext", () => {
    it("throws if components are not wrapped with ModalContext", () => {
        expect(() => renderHook(useModalContext)).toThrow(/Wrap your components in ModalContext/i);
    });
});

describe("useModal", () => {
    it("proxy-calls open method", () => {
        const { result } = renderHook(() => useModal());
        render(<Control ref={result.current.ref} />);
        result.current.open();
        expect(control.openHandler).toHaveBeenCalledTimes(1);
    });

    it("proxy-calls close method", () => {
        const { result } = renderHook(() => useModal());
        render(<Control ref={result.current.ref} />);
        result.current.close();
        expect(control.closeHandler).toHaveBeenCalledTimes(1);
    });

    it("proxy-calls toggle method", () => {
        const { result } = renderHook(() => useModal());
        render(<Control ref={result.current.ref} />);
        result.current.toggle();
        expect(control.toggleHandler).toHaveBeenCalledTimes(1);
    });
});

describe("useModalState", () => {
    it("proxy-calls open method", async () => {
        const { result } = renderHook(() => useModalState());
        render(<Control ref={result.current.ref} />);
        result.current.open();
        expect(control.openHandler).toHaveBeenCalledTimes(1);
    });

    it("proxy-calls close method", () => {
        const { result } = renderHook(() => useModalState());
        render(<Control ref={result.current.ref} />);
        result.current.close();
        expect(control.closeHandler).toHaveBeenCalledTimes(1);
    });

    it("proxy-calls toggle method", () => {
        const { result } = renderHook(() => useModalState());
        render(<Control ref={result.current.ref} />);
        result.current.toggle();
        expect(control.toggleHandler).toHaveBeenCalledTimes(1);
    });

    it("changes isOpen state on modal toggle", () => {
        const { result } = renderHook(() => useModalState());
        render(
            <Modal ref={result.current.ref}>
                <></>
            </Modal>
        );
        act(() => result.current.open());
        expect(result.current.isOpen).toBe(true);
        act(() => result.current.close());
        expect(result.current.isOpen).toBe(false);
        act(() => result.current.toggle());
        expect(result.current.isOpen).toBe(true);
        act(() => result.current.toggle());
        expect(result.current.isOpen).toBe(false);
    });
});
