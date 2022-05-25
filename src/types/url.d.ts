interface ParsedQuery {
    [key: string]: string | null;
}

interface QueryObject {
    [key: string]: string | boolean | null | undefined | number;
}
