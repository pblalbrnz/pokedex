import { ReactNode, useContext } from "react";
import ThemeContext from "../../ThemeContext";
import { twMerge } from "tailwind-merge";

interface HeaderWrapperProps {
  children: ReactNode;
}

export function HeaderWrapper(props: HeaderWrapperProps) {
  const theme = useContext(ThemeContext);

  let wrapperStyle;

  if (theme === "light") wrapperStyle = "bg-slate-200";
  if (theme === "dark") wrapperStyle = "bg-slate-800";

  return (
    <header
      className={twMerge(
        "fixed w-screen h-16 flex items-center px-12 py-4 justify-between z-50",
        wrapperStyle
      )}
    >
      {props.children}
    </header>
  );
}
