import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { Card } from "../components/Card";
import { Navigation } from "../components/Navigation";
import { useState } from "react";

export interface pokemonsProps {
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
  species: { url: string };
}

interface PokemonsPageProps {
  pokemons: pokemonsProps[];
  pokemonGenerations: Record<string, string>;
  legendaryStatus: Record<string, boolean>;
}

export function PokemonsPage(props: PokemonsPageProps) {
  const [filter /*, setFilter */] = useState<string>("");
  const [page, setPage] = useState(1);

  const filteredPokemons = props.pokemons.filter((pokemon) => {
    return filter.length >= 1
      ? pokemon.types.some((type) => type.type.name === filter)
      : props.pokemons;
  });

  const totalPages = Math.ceil(filteredPokemons.length / 24);

  const navigatorButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i > 1) navigatorButtons.push(i);
  }

  const itemsPerPage = 24;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  return (
    <>
      <div className="w-screen md:grid md:grid-cols-6 md:justify-between gap-2 lg:flex lg:flex-wrap px-12 pt-20 pb-4">
        {filteredPokemons.map((pokemon, index) => {
          const pageFilter = index >= startIndex && index < endIndex;
          const generation = props.pokemonGenerations[pokemon.name];
          const isLegendary = props.legendaryStatus[pokemon.name];
          console.log(isLegendary);
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
                  generation={generation}
                  legendary={isLegendary}
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
          variant={page == 1 ? "disabled" : "active"}
        />
        <Navigation.Button
          placeholder={"1"}
          onClick={() => setPage(1)}
          disabled={page == 1}
          variant={page == 1 ? "disabled" : "active"}
        />
        {navigatorButtons.map((btn, index) => {
          if (index == navigatorButtons.length - 1) return;
          else
            return (
              <Navigation.Button
                key={btn}
                placeholder={btn.toString()}
                onClick={() => setPage(btn)}
                disabled={btn == page}
                variant={btn == page ? "disabled" : "active"}
              />
            );
        })}
        <Navigation.Button
          placeholder={totalPages.toString()}
          onClick={() => setPage(totalPages)}
          disabled={page == totalPages}
          variant={page == totalPages ? "disabled" : "active"}
        />
        <Navigation.Button
          placeholder={PiArrowRightBold}
          onClick={() =>
            setPage((page) => (page == totalPages ? totalPages : page + 1))
          }
          disabled={page == totalPages}
          variant={page == totalPages ? "disabled" : "active"}
        />
      </Navigation.Wrapper>
    </>
  );
}
