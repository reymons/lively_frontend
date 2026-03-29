export type Message<T = any, D extends Record<string, any> = Record<string, any>> = {
    type: T;
    data: D;
};
