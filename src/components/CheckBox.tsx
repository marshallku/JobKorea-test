import fcls from "../utils/fcls";
import "./CheckBox.css";

export default function CheckBox({
    className,
    name,
    checked,
    onChange,
    label,
    children,
}: CheckBoxProps) {
    return (
        <label className={fcls(className, "checkbox")}>
            <input
                type="checkbox"
                className="checkbox__input"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            <div className="checkbox__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="M18.9 35.7 7.7 24.5 9.85 22.35 18.9 31.4 38.1 12.2 40.25 14.35Z" />
                </svg>
            </div>
            {children || <span>{label}</span>}
        </label>
    );
}
