import { useEffect, useRef } from "react";

// Use only if really needed and almost always prefer useEffect
// If you end up using useEffectOnce, provide a detailed comment of why
export function useEffectOnce(effect: React.EffectCallback) {
    const destroyFuncRef = useRef<void | (() => void)>(() => {});
    const calledOnceRef = useRef(false);
    const renderAfterCalledRef = useRef(false);

    if (calledOnceRef.current) {
        renderAfterCalledRef.current = true;
    }

    useEffect(() => {
        if (calledOnceRef.current) {
            return;
        }

        calledOnceRef.current = true;
        destroyFuncRef.current = effect();

        return () => {
            if (!renderAfterCalledRef.current) {
                return;
            }

            if (destroyFuncRef.current) {
                destroyFuncRef.current();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
