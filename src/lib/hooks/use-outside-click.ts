import { useEffect } from "react";

type Options = {
    onClick: () => void;
    isOpen: boolean;
    ref: React.RefObject<HTMLElement | null>;
    deps?: React.DependencyList;
};

export const useOutsideClick = (opts: Options) => {
    const { onClick, isOpen, ref, deps = [] } = opts;

    useEffect(() => {
        const node = ref.current;

        if (!node || !isOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (!node.contains(e.target as HTMLElement)) onClick();
        };

        document.addEventListener("click", handleClick, { capture: true });
        return () => {
            document.removeEventListener("click", handleClick, { capture: true });
        };
        // eslint-disable-next-line
    }, [ref, isOpen, onClick, ...deps]);
};
