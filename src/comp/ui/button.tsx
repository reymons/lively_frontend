import cn from "classnames";
import { Link, type LinkProps } from "react-router";
import Preloader from "@ui/preloader";
import sl from "./button.module.scss";

export type ButtonProps<AsLink extends boolean = false> = {
    kind?: "primary";
    size?: "sm" | "md";
    // Show the loading state of the button
    loading?: boolean;
    // Insert some elements to the right of the children
    // Can be used to decorate a button with different icons
    beforeEnd?: React.ReactNode;
    // Make the button take the parent's width
    stretch?: boolean;
    // Use button as a react-router link
    asLink?: AsLink;
} & (AsLink extends true ? LinkProps : React.JSX.IntrinsicElements["button"]);

// These props are used when extending from the Button component
// type ExtProps = Omit<ButtonProps, "beforeEnd">;

export default function Button<AsLink extends boolean = false>({
    children,
    kind = "primary",
    size = "md",
    loading,
    beforeEnd,
    stretch,
    asLink,
    type,
    className,
    ...rest
}: ButtonProps<AsLink>) {
    const Element = (asLink ? Link : "button") as any;

    return (
        <Element
            className={cn(className, sl.button, stretch && sl.stretch)}
            data-kind={kind}
            data-size={size}
            aria-busy={loading}
            type={asLink ? type : (type ?? "button")}
            {...rest}
        >
            {loading ? (
                <Preloader />
            ) : (
                <>
                    {children}
                    {beforeEnd}
                </>
            )}
        </Element>
    );
}
