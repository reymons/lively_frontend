import { useRef, useState } from "react";
import { useOutsideClick } from "./use-outside-click";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type HookOptions = PartialBy<Parameters<typeof useOutsideClick>[0], "ref" | "isOpen">;

const App = ({ opts }: { opts: HookOptions }) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick({ ref, isOpen: true, ...opts });
    return (
        <div data-testid="target">
            <div ref={ref} />
        </div>
    );
};

const clickOutside = () => userEvent.click(screen.getByTestId("target"));

test("calls click handler on outside click", async () => {
    const clickHandler = jest.fn();
    render(<App opts={{ onClick: clickHandler }} />);
    await clickOutside();
    expect(clickHandler).toHaveBeenCalledTimes(1);
});

test("doesn't call click handler if isOpen is false", async () => {
    const clickHandler = jest.fn();
    render(<App opts={{ isOpen: false, onClick: clickHandler }} />);
    await clickOutside();
    expect(clickHandler).toHaveBeenCalledTimes(0);
});

test("calls click handler after isOpen toggle", async () => {
    const clickHandler = jest.fn();
    const Wrapper = () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <App opts={{ isOpen, onClick: clickHandler }} />
                <button onClick={() => setIsOpen(p => !p)} />
            </>
        );
    };
    render(<Wrapper />);
    const btn = screen.getByRole("button");
    await clickOutside();
    expect(clickHandler).toHaveBeenCalledTimes(0);
    await userEvent.click(btn);
    await clickOutside();
    expect(clickHandler).toHaveBeenCalledTimes(1);
});
