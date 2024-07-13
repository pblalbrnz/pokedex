import { TbListSearch, TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import {
  PiCircleNotchBold,
  PiCirclesFourBold,
  PiMoonBold,
  PiSunBold,
} from "react-icons/pi";
import { useEffect, useState } from "react";
import { useTheme } from "./useTheme";
import ThemeContext from "./ThemeContext";
import { PokemonsPage, pokemonsProps } from "./pages/Pokemons";
import { twMerge } from "tailwind-merge";

function App() {
  const themeHook = useTheme();

  if (themeHook.states.theme === "light") document.body.classList.add("light");

  const [pokemons, setPokemons] = useState<pokemonsProps[]>([]);
  const [pokemonGenerations, setPokemonGenerations] = useState<
    Record<string, string>
  >({});
  const [legendaryStatus, setLegendaryStatus] = useState<
    Record<string, boolean>
  >({});

  const getApiData = async () => {
    const endpoints = [];
    try {
      for (let i = 1; i <= 500; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
      const responses = await Promise.all(
        endpoints.map((endpoint) => fetch(endpoint))
      );
      const pokemonData = await Promise.all(
        responses.map(async (response) => response.json())
      );
      setPokemons(pokemonData);

      const speciesUrls = pokemonData.map((pokemon) => pokemon.species.url);
      const speciesResponses = await Promise.all(
        speciesUrls.map((url) => fetch(url))
      );
      const speciesData = await Promise.all(
        speciesResponses.map(async (response) => response.json())
      );

      const generationsMap: Record<string, string> = {};
      const legendaryMap: Record<string, boolean> = {};
      await Promise.all(
        speciesData.map(async (species, index) => {
          const generationResponse = await fetch(species.generation.url);
          const generationData = await generationResponse.json();
          generationsMap[pokemonData[index].name] = generationData.name;
          legendaryMap[pokemonData[index].name] = species.is_legendary;
        })
      );

      setPokemonGenerations(generationsMap);
      setLegendaryStatus(legendaryMap);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  let loadingStyle;

  if (themeHook.states.theme == "light") loadingStyle = "text-slate-800";
  if (themeHook.states.theme == "dark") loadingStyle = "text-slate-200";
  return (
    <ThemeContext.Provider value={themeHook.states.theme}>
      <Header.Wrapper>
        <div className="flex gap-4">
          <Header.Toggle
            title="theme"
            icons={{
              toggle: { icon: PiMoonBold },
              toggled: { icon: PiSunBold },
            }}
            toggled={themeHook.states.theme == "light" ? false : true}
            theme={themeHook.actions.handleTheme}
          />
          <Header.Button placeholder="Pokemons" icon={TbPokeball} />
          <Header.Input placeholder="Greeninja" icon={PiCirclesFourBold} />
        </div>
        <div className="flex gap-4">
          <Header.Button placeholder="Filter" icon={TbListSearch} />
        </div>
      </Header.Wrapper>
      {pokemons.length > 0 ? (
        <PokemonsPage
          pokemons={pokemons}
          legendaryStatus={legendaryStatus}
          pokemonGenerations={pokemonGenerations}
        />
      ) : (
        <div
          className={twMerge(
            "w-full h-screen px-12 pt-20 pb-4 flex flex-col justify-center items-center gap-2",
            loadingStyle
          )}
        >
          <PiCircleNotchBold className="animate-spin" size={128} />
          <span className="text-xl font-poppins font-bold">Loading...</span>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export default App;
