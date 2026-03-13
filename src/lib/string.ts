export function obscure(str: string, startSize: number, endSize: number): string {
    if (str.length < startSize + endSize) return "*".repeat(str.length);
    return str.substring(0, startSize) + "******" + str.substring(str.length - endSize, str.length);
}
