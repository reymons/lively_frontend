import { useState, useRef, useEffect } from "react";

export default function useTimeoutCallback<T extends (...args: any[]) => void>(
    cb: T,
    timeout: number
) {
    const [disabled, setDisabled] = useState(false);
    const timeoutIdRef = useRef(-1);

    const timeoutCb = (...args: any[]) => {
        if (disabled) return;
        setDisabled(true);
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setDisabled(false);
        }, timeout) as any as number;
        cb(...args);
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = -1;
        };
    }, []);

    return [timeoutCb as T, disabled] as const;
}
