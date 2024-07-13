import React, { useEffect, useState } from "react";
import { getDetailedPokemon } from "../api";
import { DetailedPokemonProps } from "../types";
import { Card } from "../components/Card";
import { Navigation } from "../components/Navigation";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

const Pokedex: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<DetailedPokemonProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemsPerPage = 24;
  const totalPokemon = 1025;
  const paginationButtonCount = 4;

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setTotalPages(Math.ceil(totalPokemon / itemsPerPage));
        await fetchPokemonPage(1);
      } catch (error) {
        console.error("Error fetching all Pokémon:", error);
      }
    };

    fetchAllPokemon();
  }, []);

  const fetchPokemonPage = async (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalPokemon);

    try {
      const promises = [];
      for (let i = startIndex + 1; i <= endIndex; i++) {
        promises.push(getDetailedPokemon(i));
      }
      const detailedPokemonList = await Promise.all(promises);
      setPokemonList(detailedPokemonList);
    } catch (error) {
      console.error(`Error fetching Pokémon page ${page}:`, error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPokemonPage(page);
  };
  const renderPagination = () => {
    const pages = [];
    const halfRange = Math.floor(paginationButtonCount / 2);
    let startPage = Math.max(currentPage - halfRange, 1);
    let endPage = startPage + paginationButtonCount - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - paginationButtonCount + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <Navigation.Wrapper>
        <Navigation.Button
          placeholder={PiArrowLeftBold}
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage == 1}
          variant={currentPage == 1 ? "disabled" : "active"}
        />
        {currentPage > 3 && (
          <Navigation.Button
            placeholder={"1"}
            onClick={() => handlePageChange(1)}
            disabled={currentPage == 1}
            variant={currentPage == 1 ? "disabled" : "active"}
          />
        )}
        {pages.map((page) => (
          <Navigation.Button
            placeholder={page.toString()}
            onClick={() => handlePageChange(page)}
            disabled={currentPage == page}
            variant={currentPage == page ? "disabled" : "active"}
          />
        ))}
        {currentPage < totalPages - 1 && (
          <Navigation.Button
            placeholder={totalPages.toString()}
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage == totalPages}
            variant={currentPage == totalPages ? "disabled" : "active"}
          />
        )}
        <Navigation.Button
          placeholder={PiArrowRightBold}
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : currentPage
            )
          }
          disabled={currentPage == totalPages}
          variant={currentPage == totalPages ? "disabled" : "active"}
        />
      </Navigation.Wrapper>
    );
  };
  return (
    <>
      <div className="w-screen md:grid md:grid-cols-6 md:justify-between gap-2 lg:flex lg:flex-wrap px-12 pt-20 pb-4">
        {pokemonList.map(({ pokemon, species }) => (
          <Card.Wrapper
            key={pokemon.id}
            pkmType={pokemon.types[0].type.name}
            // onClick={() => {}}
          >
            <Card.PokemonSprite
              id={pokemon.id + 1}
              name={pokemon.name}
              sprite={pokemon.sprites.front_default}
            />
            <Card.Pokemon
              name={pokemon.name}
              types={pokemon.types.map((type) => type.type.name)}
              generation={species.generation.name}
              legendary={species.is_legendary}
              mythical={species.is_mythical}
            />
          </Card.Wrapper>
        ))}
      </div>
      {renderPagination()}
    </>
  );
};
export default Pokedex;
