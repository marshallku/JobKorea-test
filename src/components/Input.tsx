import { useMemo, useState } from "react";
import endsWithStopConsonant from "../utils/endsWithStopConsonant";
import fcls from "../utils/fcls";
import "./Input.css";

export default function Input({
    type,
    placeholder,
    required,
    pattern,
    minLength,
    maxLength,
    errorText,
    onChange,
    button,
}: InputProps) {
    const [touched, setTouched] = useState(false);
    const [value, setValue] = useState("");
    const formattedPlaceholder = useMemo(
        () => (placeholder ? placeholder.replace(/\(.+\)/, "") : ""),
        [placeholder]
    );
    const postPositionOfPlaceholder = useMemo(
        () => (endsWithStopConsonant(formattedPlaceholder) ? "을" : "를"),
        [placeholder]
    );

    return (
        <div className="input">
            <input
                type={type || "text"}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                pattern={pattern}
                placeholder={placeholder}
                className={fcls(
                    "input__field",
                    !!button && "input__field--fixed",
                    touched && "input__field--touched"
                )}
                onBlur={() => {
                    if (touched) {
                        return;
                    }

                    setTouched(true);
                }}
                onChange={(event) => {
                    setValue(event.target.value);
                    onChange?.(event);
                }}
            />
            <label className="input__label">{placeholder}</label>
            {!!button && (
                <button
                    type="button"
                    className="input__button"
                    onClick={button.onClick}
                >
                    {button.text}
                </button>
            )}
            <div className="input__error">
                {value === "" && placeholder
                    ? `${formattedPlaceholder}${postPositionOfPlaceholder} 입력해주세요`
                    : errorText}
            </div>
        </div>
    );
}
