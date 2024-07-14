import { TbListSearch, TbPokeball } from "react-icons/tb";
import { Header } from "./components/Header";
import "./global.css";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCirclesFourBold,
  PiMoonBold,
  PiSunBold,
} from "react-icons/pi";
import { useTheme } from "./useTheme";
import ThemeContext from "./ThemeContext";
import { useEffect, useState } from "react";
import {
  getAllPokemonNames,
  getDetailedPokemon,
  getRandomPokemonName,
} from "./api";
import { Card } from "./components/Card";
import { Navigation } from "./components/Navigation";
import { DetailedPokemonProps } from "./types";
import { capitalize } from "./functions/String";
function App() {
  const themeHook = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);
  }, []);

  const [randomPlaceholder, setRandomPlaceholder] = useState<string>("");

  useEffect(() => {
    const fetchRandomPokemonName = async () => {
      try {
        const { name, id } = await getRandomPokemonName(); // Function to fetch a random Pokemon name
        setRandomPlaceholder(`${capitalize(name)} or ${id}`);
      } catch (error) {
        console.error("Error fetching random Pokemon name:", error);
        setRandomPlaceholder("Search by name or ID");
      }
    };

    fetchRandomPokemonName();
  }, []);

  const [pokemonList, setPokemonList] = useState<DetailedPokemonProps[]>([]);
  const [allPokemonNames, setAllPokemonNames] = useState<
    { name: string; url: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemsPerPage = 12;
  const totalPokemon = 1025;
  const paginationButtonCount = 4;

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      try {
        const names = await getAllPokemonNames();
        setAllPokemonNames(names);
        setTotalPages(Math.ceil(totalPokemon / itemsPerPage));
        await fetchPokemonPage(1);
      } catch (error) {
        console.error("Error fetching all Pokémon data:", error);
      }
    };

    fetchAllPokemonData();
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

  const handleSearch = async (query: string) => {
    if (!query) {
      fetchPokemonPage(1);
      setCurrentPage(1);
      setTotalPages(Math.ceil(totalPokemon / itemsPerPage));
      return;
    }

    try {
      const filteredNames = allPokemonNames.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      const promises = filteredNames.map((pokemon) => {
        const id = parseInt(pokemon.url.split("/").slice(-2, -1)[0], 10);
        return getDetailedPokemon(id);
      });

      const detailedPokemonList = await Promise.all(promises);

      setPokemonList(detailedPokemonList);
      setTotalPages(Math.ceil(filteredNames.length / itemsPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching Pokémon by search:", error);
      setPokemonList([]); // Clear list if search fails
      setTotalPages(1);
    }
  };

  const resetSearch = async () => {
    fetchPokemonPage(1);
    setCurrentPage(1);
    setTotalPages(Math.ceil(totalPokemon / itemsPerPage));
    return;
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
          placeholder={PiCaretDoubleLeftBold}
          onClick={() => handlePageChange(1)}
          disabled={currentPage == 1}
          variant={currentPage == 1 ? "disabled" : "active"}
        />
        <Navigation.Button
          placeholder={PiArrowLeftBold}
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage == 1}
          variant={currentPage == 1 ? "disabled" : "active"}
        />
        {pages.map((page) => (
          <Navigation.Button
            placeholder={page.toString()}
            onClick={() => handlePageChange(page)}
            disabled={currentPage == page}
            variant={currentPage == page ? "disabled" : "active"}
          />
        ))}
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
        <Navigation.Button
          placeholder={PiCaretDoubleRightBold}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage == totalPages}
          variant={currentPage == totalPages ? "disabled" : "active"}
        />
      </Navigation.Wrapper>
    );
  };

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
          <Header.Button
            placeholder="Pokemons"
            icon={TbPokeball}
            onClick={resetSearch}
          />
          <Header.Input
            placeholder={randomPlaceholder}
            icon={PiCirclesFourBold}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex gap-4">
          <Header.Button placeholder="Filter" icon={TbListSearch} />
        </div>
      </Header.Wrapper>

      <div className="w-screen md:grid md:grid-cols-6 md:justify-between gap-2 lg:flex lg:flex-wrap px-12 pt-20 pb-8">
        {pokemonList.map(({ pokemon, species }) => (
          <Card.Wrapper
            key={pokemon.id}
            pkmType={pokemon.types[0].type.name}
            // onClick={() => {}}
          >
            <Card.PokemonSprite
              id={pokemon.id}
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
    </ThemeContext.Provider>
  );
}

export default App;
