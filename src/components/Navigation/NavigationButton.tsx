import { ButtonHTMLAttributes, useContext } from "react";
import { IconType } from "react-icons";
import ThemeContext from "../../ThemeContext";
import { twMerge } from "tailwind-merge";

interface NavigationButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder: IconType | string;
  variant: "disabled" | "active";
}

export function NavigationButton(props: NavigationButtonProps) {
  const theme = useContext(ThemeContext);

  let btnStyle;

  if (theme === "light") {
    if (props.variant == "active")
      btnStyle =
        "bg-blue-400 text-slate-200 hover:bg-blue-600 hover:text-slate-300";
    if (props.variant == "disabled") btnStyle = "bg-slate-400 text-slate-200";
  }
  if (theme === "dark") {
    if (props.variant == "active")
      btnStyle =
        "bg-blue-600 text-slate-800 hover:bg-blue-800 hover:text-slate-950";
    if (props.variant == "disabled") btnStyle = "bg-slate-600 text-slate-800";
  }

  return (
    <button
      className={twMerge(
        "w-8 aspect-square justify-center rounded-md flex items-center transition-colors ease-linear font-noto",
        btnStyle
      )}
      {...props}
    >
      {typeof props.placeholder == "string" ? (
        props.placeholder
      ) : (
        <props.placeholder />
      )}
    </button>
  );
}
