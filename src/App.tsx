import { TbListSearch, TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import { PiCirclesFourBold, PiMoonBold, PiSunBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { useTheme } from "./useTheme";
import ThemeContext from "./ThemeContext";

interface pokemonsProps {
  name: string;
  sprites: { front_default: string };
  types: [
    {
      type: {
        name:
          | "bug"
          | "dark"
          | "dragon"
          | "electric"
          | "fairy"
          | "fighting"
          | "fire"
          | "flying"
          | "ghost"
          | "grass"
          | "ground"
          | "ice"
          | "normal"
          | "poison"
          | "psychic"
          | "rock"
          | "steel"
          | "water";
      };
    }
  ];
}

function App() {
  const themeHook = useTheme();

  if (themeHook.states.theme === "light") document.body.classList.add("light");

  const [pokemons, setPokemons] = useState<pokemonsProps[]>([]);

  const [filter, setFilter] = useState<string>("");

  const getApiData = async () => {
    const endpoints = [];
    try {
      for (let i = 1; i <= 151; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
      await Promise.all(endpoints.map((endpoint) => fetch(endpoint)))
        .then((res) => Promise.all(res.map(async (r) => r.json())))
        .then((res) => setPokemons(res));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) => {
    return filter.length >= 1
      ? pokemon.types.some((type) => type.type.name == filter)
      : pokemons;
  });

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
      <div className="w-screen flex flex-wrap gap-2 justify-between px-12 pt-20">
        {filteredPokemons.map((pokemon, index) => {
          return (
            <Card.Wrapper
              key={index}
              pkmType={pokemon.types[0].type.name}
              // onClick={() => {}}
            >
              <Card.PokemonSprite
                id={index + 1}
                name={pokemon.name}
                sprite={pokemon.sprites.front_default}
              />
              <Card.Pokemon
                name={pokemon.name}
                types={pokemon.types.map((type) => type.type.name)}
              />
            </Card.Wrapper>
          );
        })}
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
