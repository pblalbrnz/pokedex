import { ButtonHTMLAttributes, ReactNode, useContext } from "react";
import { IconType } from "react-icons";
import { PiQuestionBold } from "react-icons/pi";
import ThemeContext from "../../ThemeContext";
import { twMerge } from "tailwind-merge";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: ReactNode;
  icon?: IconType;
}

export function HeaderButton({
  placeholder = "Button",
  icon: Icon = PiQuestionBold,
  ...props
}: HeaderButtonProps) {
  const theme = useContext(ThemeContext);

  let btnStyle;

  if (theme === "light")
    btnStyle =
      "bg-slate-300 text-slate-800 hover:bg-blue-200 hover:text-blue-600";
  if (theme === "dark")
    btnStyle =
      "bg-slate-700 text-slate-100 hover:bg-blue-600 hover:text-blue-200";

  return (
    <button
      className={twMerge(
        "px-4 py-2 bg-slate-300 rounded-md flex items-center gap-2 transition-colors ease-linear font-noto",
        btnStyle
      )}
      {...props}
    >
      <Icon size={20} />
      {placeholder}
    </button>
  );
}
