
interface InputProps {
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name?: string;
}

const Input = ({ type, value, placeholder, onChange, className, name }: InputProps) =>{
    return(
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} className={className} name={name} />
    );
};

export default Input;