import axios from "axios";
import {
  PokemonProps,
  SpeciesProps,
  PokemonListResponseProps,
  DetailedPokemonProps,
  MinPokemonProps,
} from "./types";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async (id: number): Promise<PokemonProps> => {
  const response = await axios.get<PokemonProps>(
    `${API_BASE_URL}/pokemon/${id}`
  );
  return response.data;
};

export const getPokemonSpecies = async (id: number): Promise<SpeciesProps> => {
  const response = await axios.get<SpeciesProps>(
    `${API_BASE_URL}/pokemon-species/${id}`
  );
  return response.data;
};

export const getPokemonList = async (
  offset: number,
  limit: number
): Promise<PokemonListResponseProps> => {
  const response = await axios.get<PokemonListResponseProps>(
    `${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data;
};

export const getDetailedPokemon = async (
  id: number
): Promise<DetailedPokemonProps> => {
  const pokemonResponse = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
  const speciesResponse = await axios.get(pokemonResponse.data.species.url);

  return {
    pokemon: pokemonResponse.data,
    species: speciesResponse.data,
  };
};

export const getAllPokemonNames = async (): Promise<
  { name: string; url: string }[]
> => {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=1025`);
  return response.data.results;
};

export const getRandomPokemonName = async (): Promise<MinPokemonProps> => {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon data");
    }
    const data = await response.json();
    const results = data.results;
    const randomIndex = Math.floor(Math.random() * results.length);
    const pokemon = results[randomIndex];

    // Fetch detailed information for the selected Pokémon to get its ID
    const pokemonResponse = await fetch(pokemon.url);
    if (!pokemonResponse.ok) {
      throw new Error("Failed to fetch Pokémon details");
    }
    const pokemonData = await pokemonResponse.json();

    return {
      name: pokemon.name,
      id: pokemonData.id,
    };
  } catch (error) {
    console.error("Error fetching random Pokémon:", error);
    throw error;
  }
};
