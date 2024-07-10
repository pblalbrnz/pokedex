import { TbListSearch, TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import { PiCirclesFourBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";

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
    <>
      <Header.Wrapper>
        <div className="flex gap-4">
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
    </>
  );
}

export default App;
