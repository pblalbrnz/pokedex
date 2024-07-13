import { TbListSearch, TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiCirclesFourBold,
  PiMoonBold,
  PiSunBold,
} from "react-icons/pi";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { useTheme } from "./useTheme";
import ThemeContext from "./ThemeContext";
import { Navigation } from "./components/Navigation";

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

  const [page, setPage] = useState(1);

  if (themeHook.states.theme === "light") document.body.classList.add("light");

  const [pokemons, setPokemons] = useState<pokemonsProps[]>([]);

  const [filter /*, setFilter */] = useState<string>("");

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

  const itemsPerPage = 24;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const totalPages = Math.ceil(pokemons.length / 24);

  const navigatorButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    navigatorButtons.push(
      <Navigation.Button
        key={i}
        placeholder={i.toString()}
        onClick={() => setPage(i)}
      />
    );
  }

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
      <div className="w-screen md:grid md:grid-cols-6 md:justify-between gap-2 lg:flex lg:flex-wrap px-12 pt-20 pb-4">
        {filteredPokemons.map((pokemon, index) => {
          const pageFilter = index >= startIndex && index < endIndex;
          if (pageFilter)
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
      <Navigation.Wrapper>
        <Navigation.Button
          placeholder={PiArrowLeftBold}
          onClick={() => setPage((page) => (page == 1 ? 1 : page - 1))}
          disabled={page == 1}
        />
        {navigatorButtons}
        <Navigation.Button
          placeholder={PiArrowRightBold}
          onClick={() =>
            setPage((page) => (page == totalPages ? totalPages : page + 1))
          }
          disabled={page == totalPages}
        />
      </Navigation.Wrapper>
    </ThemeContext.Provider>
  );
}

export default App;
