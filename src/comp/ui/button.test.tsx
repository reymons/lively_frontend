import { render, screen } from "@testing-library/react";
import { Router } from "@/testing/app";
import Button from "./button";

test("displays passed text", () => {
    const text = "Subscribe";
    render(<Button>{text}</Button>);
    expect(screen.getByText(text)).toBeInTheDocument();
});

test("handles loading state", () => {
    const text = "Click me";
    render(<Button loading>Click me</Button>);
    expect(screen.queryByText(text)).toBe(null);
    expect(screen.getByRole("button").getAttribute("aria-busy")).toBe("true");
});

test("converts a button to a link", () => {
    const path = "/some-path";
    render(
        <Router>
            <Button asLink to={path}>
                Hello
            </Button>
        </Router>
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", path);
});
