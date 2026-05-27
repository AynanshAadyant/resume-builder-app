export function sanitizeString(value: string | null | undefined): string {
    if (!value) return "";
    return value.trim().replace(/\s+/g, " ");
}

export function sanitizeMultilineString(value: string | null | undefined): string {
    if (!value) return "";
    return value
        .split("\n")
        .map(line => line.trim().replace(/\s+/g, " "))
        .filter(line => line.length > 0)
        .join("\n");
}

export function sanitizeArray(arr: (string | null | undefined)[] | null | undefined): string[] {
    if (!arr) return [];
    return arr
        .map(item => sanitizeString(item || ""))
        .filter(item => item.length > 0);
}
