import { HTMLAttributes, ReactNode, useContext } from "react";
import { twMerge } from "tailwind-merge";
import ThemeContext from "../../ThemeContext";

interface CardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pkmType: string;
}

export function CardWrapper(props: CardWrapperProps) {
  const theme = useContext(ThemeContext);

  let themeStyle;
  const typeColors: {
    dark: { [key: string]: string };
    light: { [key: string]: string };
  } = {
    light: {
      bug: "from-lime-600 to-lime-400",
      dark: "from-amber-800 to-amber-700",
      dragon: "from-indigo-800 to-indigo-600",
      electric: "from-amber-600 to-yellow-400",
      fairy: "from-pink-500 to-pink-300",
      fighting: "from-orange-700 to-orange-500",
      fire: "from-red-700 to-red-500",
      flying: "from-blue-500 to-blue-300",
      ghost: "from-purple-800 to-violet-600",
      grass: "from-green-600 to-green-400",
      ground: "from-orange-600 to-orange-300",
      ice: "from-sky-500 to-sky-300",
      normal: "from-stone-500 to-stone-300",
      poison: "from-purple-700 to-purple-400",
      psychic: "from-pink-600 to-pink-400",
      rock: "from-amber-700 to-amber-600",
      steel: "from-slate-500 to-slate-300",
      water: "from-blue-600 to-blue-400",
    },
    dark: {
      bug: "from-lime-700 to-lime-500",
      dark: "from-amber-900 to-amber-800",
      dragon: "from-indigo-900 to-indigo-700",
      electric: "from-amber-700 to-yellow-500",
      fairy: "from-pink-600 to-pink-400",
      fighting: "from-orange-800 to-orange-600",
      fire: "from-red-800 to-red-600",
      flying: "from-blue-600 to-blue-400",
      ghost: "from-purple-800 to-violet-700",
      grass: "from-green-700 to-green-500",
      ground: "from-orange-700 to-orange-400",
      ice: "from-sky-600 to-sky-400",
      normal: "from-stone-600 to-stone-400",
      poison: "from-purple-800 to-purple-500",
      psychic: "from-pink-700 to-pink-500",
      rock: "from-amber-800 to-amber-700",
      steel: "from-slate-600 to-slate-400",
      water: "from-blue-700 to-blue-500",
    },
  };
  if (theme == "light") themeStyle = typeColors.light[props.pkmType];
  if (theme == "dark") themeStyle = typeColors.dark[props.pkmType];

  return (
    <div
      className={twMerge(
        "flex flex-col w-48 h-60 text-center rounded-md ease-linear transition-all overflow-hidden bg-gradient-to-t hover:scale-110 hover:shadow cursor-pointer",
        themeStyle || "from-slate-500 to-slate-400"
      )}
    >
      {props.children}
    </div>
  );
}
