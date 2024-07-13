import { twMerge } from "tailwind-merge";
import { capitalize, capitalizeWords } from "../../functions/String";
import { useContext } from "react";
import ThemeContext from "../../ThemeContext";
import { PiSparkleFill, PiStarFill } from "react-icons/pi";

interface CardPokemonProps {
  name: string;
  types: string[];
  generation: string;
  legendary?: boolean;
  mythical?: boolean;
}

export function CardPokemon(props: CardPokemonProps) {
  const theme = useContext(ThemeContext);

  let nameStyle, themeStyle: { bg: string; name: string }, divisorStyle;
  const typeColors: {
    dark: { [key: string]: { bg: string; name: string } };
    light: { [key: string]: { bg: string; name: string } };
  } = {
    light: {
      bug: { bg: "bg-lime-400 text-lime-900", name: "text-lime-200" },
      dark: { bg: "bg-orange-800 text-orange-200", name: "text-orange-200" },
      dragon: { bg: "bg-indigo-700 text-indigo-200", name: "text-indigo-200" },
      electric: { bg: "bg-amber-500 text-amber-900", name: "text-amber-200" },
      fairy: { bg: "bg-pink-300 text-pink-800", name: "text-pink-200" },
      fighting: {
        bg: "bg-orange-600 text-orange-100",
        name: "text-orange-200",
      },
      fire: { bg: "bg-red-500 text-red-100", name: "text-red-200" },
      flying: { bg: "bg-blue-300 text-blue-900", name: "text-blue-200" },
      ghost: { bg: "bg-violet-700 text-violet-100", name: "text-violet-200" },
      grass: { bg: "bg-green-400 text-green-900", name: "text-green-200" },
      ground: { bg: "bg-orange-400 text-orange-900", name: "text-orange-200" },
      ice: { bg: "bg-sky-100 text-sky-900", name: "text-sky-200" },
      normal: { bg: "bg-stone-300 text-stone-900", name: "text-stone-200" },
      poison: { bg: "bg-purple-500 text-purple-200", name: "text-purple-200" },
      psychic: { bg: "bg-pink-500 text-pink-200", name: "text-pink-200" },
      rock: { bg: "bg-orange-800 text-orange-200", name: "text-orange-200" },
      steel: { bg: "bg-slate-400 text-slate-800", name: "text-slate-200" },
      water: { bg: "bg-blue-400 text-blue-800", name: "text-blue-200" },
    },
    dark: {
      bug: { bg: "bg-lime-500 text-lime-900", name: "text-lime-200" },
      dark: { bg: "bg-orange-900 text-orange-200", name: "text-orange-200" },
      dragon: { bg: "bg-indigo-800 text-indigo-200", name: "text-indigo-200" },
      electric: { bg: "bg-amber-600 text-amber-900", name: "text-amber-200" },
      fairy: { bg: "bg-pink-400 text-pink-800", name: "text-pink-200" },
      fighting: {
        bg: "bg-orange-700 text-orange-100",
        name: "text-orange-200",
      },
      fire: { bg: "bg-red-600 text-red-100", name: "text-red-200" },
      flying: { bg: "bg-blue-400 text-blue-900", name: "text-blue-200" },
      ghost: { bg: "bg-violet-800 text-violet-100", name: "text-violet-200" },
      grass: { bg: "bg-green-500 text-green-900", name: "text-green-200" },
      ground: { bg: "bg-orange-500 text-orange-900", name: "text-orange-200" },
      ice: { bg: "bg-sky-100 text-sky-900", name: "text-sky-200" },
      normal: { bg: "bg-stone-400 text-stone-900", name: "text-stone-200" },
      poison: { bg: "bg-purple-600 text-purple-200", name: "text-purple-200" },
      psychic: { bg: "bg-pink-600 text-pink-200", name: "text-pink-200" },
      rock: { bg: "bg-orange-900 text-orange-200", name: "text-orange-200" },
      steel: { bg: "bg-slate-500 text-slate-800", name: "text-slate-200" },
      water: { bg: "bg-blue-500 text-blue-800", name: "text-blue-200" },
    },
  };

  if (theme == "light") {
    nameStyle = typeColors.light[props.types[0]];
    divisorStyle = "bg-slate-100";
  }
  if (theme == "dark") {
    nameStyle = typeColors.dark[props.types[0]];
    divisorStyle = "bg-slate-200";
  }

  let generation: string = "No Data";

  if (props.generation == "generation-i") generation = "Gen 1";
  if (props.generation == "generation-ii") generation = "Gen 2";
  if (props.generation == "generation-iii") generation = "Gen 3";
  if (props.generation == "generation-iv") generation = "Gen 4";
  if (props.generation == "generation-v") generation = "Gen 5";
  if (props.generation == "generation-vi") generation = "Gen 6";
  if (props.generation == "generation-vii") generation = "Gen 7";
  if (props.generation == "generation-viii") generation = "Gen 8";
  if (props.generation == "generation-ix") generation = "Gen 9";

  const colorName: { bg: string; name: string } = nameStyle!;

  return (
    <div className="w-full h-28 px-2 py-4 flex flex-col gap-2 font-noto">
      <h1 className={twMerge("font-medium text-lg", colorName.name)}>
        {capitalizeWords(props.name.replace("-", " "))}
      </h1>
      <div className="flex gap-2 justify-center">
        {props.types.map((type, index) => {
          if (theme == "light") themeStyle = typeColors.light[type];
          if (theme == "dark") themeStyle = typeColors.dark[type];
          const colorType: { bg: string; name: string } = themeStyle!;
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
      <div className="flex gap-2 justify-center items-center">
        <p className={twMerge("text-xs opacity-75 font-noto", nameStyle?.name)}>
          {generation}
        </p>
        {props.legendary ? (
          <>
            <div
              className={twMerge(
                "h-full w-px opacity-50 rounded",
                divisorStyle
              )}
            />
            <PiStarFill size={12} className={nameStyle?.name} />
          </>
        ) : (
          ""
        )}
        {props.mythical ? (
          <>
            <div
              className={twMerge(
                "h-full w-px opacity-50 rounded",
                divisorStyle
              )}
            />
            <PiSparkleFill size={12} className={nameStyle?.name} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
