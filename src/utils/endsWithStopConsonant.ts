const UNICODE_KOREAN_STARTS = 44032;
const KOREAN_CHARACTER_LENGTH = 28;

export default function endsWithStopConsonant(value?: string): boolean {
    if (!value) {
        return false;
    }

    const codeOfLastChar = value.charCodeAt(value.length - 1);

    if (codeOfLastChar < UNICODE_KOREAN_STARTS) {
        return false;
    }

    return (
        (codeOfLastChar - UNICODE_KOREAN_STARTS) % KOREAN_CHARACTER_LENGTH !== 0
    );
}
