export default function CheckBox({
    className,
    name,
    checked,
    onChange,
    label,
    children,
}: CheckBoxProps) {
    return (
        <label className={className}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
            {children || <span>{label}</span>}
        </label>
    );
}
