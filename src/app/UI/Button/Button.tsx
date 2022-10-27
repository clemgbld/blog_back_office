import { FC } from "react";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button: FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick = (e: any) => {},
  type = "button",
  className = "",
}) => {
  return (
    <button
      className={`${className} button`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
