export function numToKs(n: number) {
    if (n < 1000) return n.toString();
    if (n < 1_000_000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
}
