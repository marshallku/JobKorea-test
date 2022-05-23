import { useState } from "react";

export default function useForm(init: { [key: string]: FormItem }) {
    const [data, _setData] = useState(init);
    const validate = () =>
        Object.entries(data).every(
            ([
                _,
                { value, required, pattern, expected, minLength, maxLength },
            ]) => {
                if (expected && value !== expected) {
                    return false;
                }

                if (pattern && !pattern.test(value.toString())) {
                    return false;
                }

                if (required && !value) {
                    return false;
                }

                if (minLength && value.toString().length < minLength) {
                    return false;
                }

                if (maxLength && maxLength < value.toString().length) {
                    return false;
                }

                return true;
            }
        );
    const setData = <T extends keyof typeof init>(
        key: T,
        value: string | number | boolean
    ) => {
        _setData((origData) => {
            const copied = { ...origData };

            copied[key].value = value;

            return copied;
        });
    };

    const getAttributes = (attribute: keyof typeof init) => {
        const { name, required, pattern, minLength, maxLength } =
            data[attribute];

        return {
            placeholder: name,
            required,
            pattern: `${pattern}`.slice(1, -1),
            minLength,
            maxLength,
        };
    };

    return { data, setData, validate, getAttributes };
}
