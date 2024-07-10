import { ButtonHTMLAttributes, ReactNode } from "react";
import { IconType } from "react-icons";
import { PiQuestionBold } from "react-icons/pi";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: ReactNode;
  icon?: IconType;
}

export function HeaderButton({
  placeholder = "Button",
  icon: Icon = PiQuestionBold,
  ...props
}: HeaderButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-slate-300 rounded-md text-slate-800 flex items-center gap-2 hover:bg-blue-200 hover:text-blue-600 transition-colors ease-linear font-noto"
      {...props}
    >
      <Icon size={20} />
      {placeholder}
    </button>
  );
}
