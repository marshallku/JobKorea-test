import { useState } from "react";
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

    return (
        <div className={fcls("input", touched && "input--touched")}>
            <input
                type={type || "text"}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                pattern={pattern}
                placeholder={placeholder}
                value={value}
                className="input__field"
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
                {value === "" ? `${placeholder}를 입력해주세요` : errorText}
            </div>
        </div>
    );
}
