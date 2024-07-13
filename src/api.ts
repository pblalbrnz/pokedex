import axios from "axios";
import {
  PokemonProps,
  SpeciesProps,
  PokemonListResponseProps,
  DetailedPokemonProps,
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
  const pokemon = await getPokemon(id);
  const species = await getPokemonSpecies(id);
  return { pokemon, species };
};
