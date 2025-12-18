import type { ButtonProps } from "../../types";

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold border p-2 rounded-2xl active:bg-[#ffffff61] active:text-gray-700 duration-100 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
