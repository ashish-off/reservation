import type { ButtonProps } from "../../types";

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold p-2 rounded-2xl active:bg-[#ffffff61] active:text-gray-700 duration-100 active:scale-95 shadow-[0_2px_4px_rgba(0,0,0,0.08),0_6px_12px_rgba(0,0,0,0.12)] cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
