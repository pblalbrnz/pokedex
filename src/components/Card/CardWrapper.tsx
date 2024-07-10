import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pkmType: string;
}

export function CardWrapper(props: CardWrapperProps) {
  const typeColors: { [key: string]: string } = {
    bug: "from-lime-600 to-lime-400",
    dark: "from-orange-950 to-orange-800",
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
    rock: "from-orange-800 to-orange-700",
    steel: "from-slate-500 to-slate-300",
    water: "from-blue-600 to-blue-400",
  };
  return (
    <div
      className={twMerge(
        "flex flex-col w-48 h-60 text-center rounded-md ease-linear transition-all overflow-hidden bg-gradient-to-t hover:scale-110 hover:shadow cursor-pointer",
        typeColors[props.pkmType] || "from-slate-500 to-slate-400"
      )}
    >
      {props.children}
    </div>
  );
}
