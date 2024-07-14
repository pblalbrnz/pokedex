// src/types.ts

export interface PokemonTypeProps {
  type: {
    name: string;
  };
}

export interface MinPokemonProps {
  id: number;
  name: string;
}

export interface PokemonProps {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonTypeProps[];
}

export interface SpeciesProps {
  generation: {
    name: string;
  };
  is_legendary: boolean;
  is_mythical: boolean;
  is_baby: boolean;
}

export interface PokemonListItemProps {
  name: string;
  url: string;
}

export interface PokemonListResponseProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemProps[];
}

export interface DetailedPokemonProps {
  pokemon: PokemonProps;
  species: SpeciesProps;
}
