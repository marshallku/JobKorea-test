interface FormItem {
    name: string;
    value: string | boolean | number;
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    required?: boolean;
    pattern?: RegExp;
    expected?: string | boolean | number;
    minLength?: number;
    maxLength?: number;
}
