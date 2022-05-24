interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        IInputBoxProps {
    errorText?: string;
    button?: {
        text: string;
        onClick?: () => void;
    };
}
