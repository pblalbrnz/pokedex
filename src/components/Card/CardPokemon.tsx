import { twMerge } from "tailwind-merge";
import { capitalize, capitalizeWords } from "../../functions/String";

interface CardPokemonProps {
  name: string;
  types: string[];
}

export function CardPokemon(props: CardPokemonProps) {
  const typeColors: { [key: string]: string } = {
    bug: "bg-lime-400 text-lime-900",
    dark: "bg-orange-900 text-orange-200",
    dragon: "bg-indigo-700 text-indigo-200",
    electric: "bg-amber-500 text-amber-900",
    fairy: "bg-pink-300 text-pink-800",
    fighting: "bg-orange-600 text-orange-100",
    fire: "bg-red-500 text-red-100",
    flying: "bg-blue-300 text-blue-900",
    ghost: "bg-violet-700 text-violet-100",
    grass: "bg-green-400 text-green-900",
    ground: "bg-orange-400 text-orange-900",
    ice: "bg-sky-100 text-sky-900",
    normal: "bg-stone-300 text-stone-900",
    poison: "bg-purple-500 text-purple-200",
    psychic: "bg-pink-500 text-pink-200",
    rock: "bg-orange-900 text-orange-200",
    steel: "bg-slate-400 text-slate-800",
    water: "bg-blue-400 text-blue-800",
  };

  return (
    <div className="w-full h-28 px-2 py-4 flex flex-col gap-4 font-noto">
      <h1 className="font-medium text-lg">{capitalizeWords(props.name.replace("-", " "))}</h1>
      <div className="flex gap-2 justify-center">
        {props.types.map((type, index) => {
          const colorType: string =
            typeColors[type] || "bg-gray-300 text-gray-800";
          return (
            <span
              className={twMerge(
                "px-2 py-1 rounded-lg font-noto text-xs",
                colorType
              )}
              key={index}
            >
              {capitalize(type)}
            </span>
          );
        })}
      </div>
    </div>
  );
}
