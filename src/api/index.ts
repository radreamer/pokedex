import axios from "axios";

import { Pokemon } from "../interfaces/pokemon.interface";
import { PokemonListItem } from "../interfaces/pokemon-list-item.interface";

axios.defaults.baseURL = "https://pokeapi.co/api/v2";

export const fetchPokemonsList = async (
  offset: number,
  limit: number
): Promise<PokemonListItem[]> => {
  try {
    const response = await axios.get(
      `/pokemon?offset=${offset}&limit=${limit}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching pokemons list:", error);
    throw error;
  }
};

export const fetchPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const response = await axios.get(`/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon:", error);
    throw error;
  }
};
