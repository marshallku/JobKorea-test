export function parseQuery(query: string): ParsedQuery {
    return Object.fromEntries(
        query
            .substring(1)
            .split("&")
            .map((x) => x.split("="))
            .map(([key, value]) => [
                decodeURIComponent(key),
                decodeURIComponent(value),
            ])
    );
}

export function composeQuery(object: QueryObject): string {
    return `?${Object.entries(object)
        .filter(([, value]) => {
            const typeOfValue = typeof value;
            if (typeOfValue === "string") {
                return !!value;
            }
            if (typeOfValue === "number") {
                return true;
            }
            return false;
        })
        .map((x) => x.join("="))
        .join("&")}`;
}
