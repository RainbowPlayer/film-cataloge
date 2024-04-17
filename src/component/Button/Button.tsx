import './style.css'

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
}

const Button = ({ children, className, onClick, type}: ButtonProps) => {
    const buttonClass = `button ${className || ''}`;
    return(
        <button className={buttonClass} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;