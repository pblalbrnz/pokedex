import { twMerge } from "tailwind-merge";
import { capitalize, capitalizeWords } from "../../functions/String";

interface CardPokemonProps {
  name: string;
  types: string[];
}

export function CardPokemon(props: CardPokemonProps) {
  const typeColors: { [key: string]: { bg: string; name: string } } = {
    bug: { bg: "bg-lime-400 text-lime-900", name: "text-lime-200" },
    dark: { bg: "bg-orange-900 text-orange-200", name: "text-orange-200" },
    dragon: { bg: "bg-indigo-700 text-indigo-200", name: "text-indigo-200" },
    electric: { bg: "bg-amber-500 text-amber-900", name: "text-amber-200" },
    fairy: { bg: "bg-pink-300 text-pink-800", name: "text-pink-200" },
    fighting: { bg: "bg-orange-600 text-orange-100", name: "text-orange-200" },
    fire: { bg: "bg-red-500 text-red-100", name: "text-red-200" },
    flying: { bg: "bg-blue-300 text-blue-900", name: "text-flying-200" },
    ghost: { bg: "bg-violet-700 text-violet-100", name: "text-viole-200" },
    grass: { bg: "bg-green-400 text-green-900", name: "text-green-200" },
    ground: { bg: "bg-orange-400 text-orange-900", name: "text-orange-200" },
    ice: { bg: "bg-sky-100 text-sky-900", name: "text-sky-200" },
    normal: { bg: "bg-stone-300 text-stone-900", name: "text-stone-200" },
    poison: { bg: "bg-purple-500 text-purple-200", name: "text-purple-200" },
    psychic: { bg: "bg-pink-500 text-pink-200", name: "text-pink-200" },
    rock: { bg: "bg-orange-900 text-orange-200", name: "text-orange-200" },
    steel: { bg: "bg-slate-400 text-slate-800", name: "text-slate-200" },
    water: { bg: "bg-blue-400 text-blue-800", name: "text-blue-200" },
  };

  const colorName: { bg: string; name: string } =
    typeColors[props.types[0]] || "text-gray-800";

  return (
    <div className="w-full h-28 px-2 py-4 flex flex-col gap-4 font-noto">
      <h1 className={twMerge("font-medium text-lg", colorName.name)}>
        {capitalizeWords(props.name.replace("-", " "))}
      </h1>
      <div className="flex gap-2 justify-center">
        {props.types.map((type, index) => {
          const colorType: { bg: string; name: string } =
            typeColors[type] || "bg-gray-300 text-gray-800";
          return (
            <span
              className={twMerge(
                "px-2 py-1 rounded-lg font-noto text-xs",
                colorType.bg
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
