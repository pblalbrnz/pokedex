import { ButtonHTMLAttributes, useContext } from "react";
import { IconType } from "react-icons";
import ThemeContext from "../../ThemeContext";
import { twMerge } from "tailwind-merge";

interface HeaderToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons: {
    toggle: { icon: IconType; placeholder?: string };
    toggled: { icon: IconType; placeholder?: string };
  };
  theme?: () => void;
  title: string;
  toggled: boolean;
}

export function HeaderToggle(props: HeaderToggleProps) {
  const theme = useContext(ThemeContext);

  let toggleStyle;

  if (theme === "light")
    toggleStyle =
      "bg-slate-300 text-slate-800 hover:bg-blue-200 hover:text-blue-600 focus-within:shadow-blue-500";
  if (theme === "dark")
    toggleStyle =
      "bg-slate-700 text-slate-100 hover:bg-blue-600 hover:text-blue-200 focus-within:shadow-blue-300";

  return props.toggled == false ? (
    <button
      className={twMerge(
        "flex gap-2 px-4 py-2 items-center font-noto rounded cursor-pointer transition-all ease-linear group/header-input focus-within:shadow-border",
        toggleStyle
      )}
      onClick={() => {
        if (props.title == "theme") props.theme && props.theme();
      }}
    >
      {<props.icons.toggle.icon />}
      {props.icons.toggle.placeholder && props.icons.toggle.placeholder}
    </button>
  ) : (
    <button
      className={twMerge(
        "flex gap-2 px-4 py-2 items-center font-noto rounded cursor-pointer transition-all ease-linear group/header-input focus-within:shadow-border",
        toggleStyle
      )}
      onClick={() => {
        if (props.title == "theme") props.theme && props.theme();
      }}
    >
      {<props.icons.toggled.icon />}
      {props.icons.toggled.placeholder && props.icons.toggled.placeholder}
    </button>
  );
}
