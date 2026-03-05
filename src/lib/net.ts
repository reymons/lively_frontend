export function toError(err: unknown): Error {
    if (err instanceof Error) return err;
    return new Error("Something went wrong");
}
