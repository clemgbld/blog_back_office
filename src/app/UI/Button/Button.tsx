import { FC, SyntheticEvent } from "react";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const Button: FC<ButtonProps> = ({
  label,
  disabled = false,
  onClick = (e: SyntheticEvent) => {},
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
