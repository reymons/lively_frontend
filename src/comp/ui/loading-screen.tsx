export default function LoadingScreen() {
    return (
        <div
            aria-label="Loading the page, please wait..."
            aria-live="polite"
            aria-busy
            style={{ height: "100svh", backgroundColor: "var(--color-secondary)" }}
            data-testid="loading-screen"
        />
    );
}
