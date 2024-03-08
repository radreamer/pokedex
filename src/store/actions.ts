import { Dispatch } from "redux";

import { Pokemon } from "../interfaces/pokemon.interface";
import { PokemonListItem } from "../interfaces/pokemon-list-item.interface";

import { fetchPokemonsList, fetchPokemon } from "../api";

export const FETCH_POKEMONS_LIST_REQUEST = "FETCH_POKEMONS_LIST_REQUEST";
export const FETCH_POKEMONS_LIST_SUCCESS = "FETCH_POKEMONS_LIST_SUCCESS";
export const FETCH_POKEMONS_LIST_FAILURE = "FETCH_POKEMONS_LIST_FAILURE";
export const FETCH_POKEMON_REQUEST = "FETCH_POKEMONS_REQUEST";
export const FETCH_POKEMON_SUCCESS = "FETCH_POKEMONS_SUCCESS";
export const FETCH_POKEMON_FAILURE = "FETCH_POKEMONS_FAILURE";

export const fetchPokemonsListRequest = () => ({
  type: FETCH_POKEMONS_LIST_REQUEST,
});

export const fetchPokemonsListSuccess = (pokemonList: PokemonListItem[]) => ({
  type: FETCH_POKEMONS_LIST_SUCCESS,
  payload: pokemonList,
});

export const fetchPokemonsListFailure = (error: string) => ({
  type: FETCH_POKEMONS_LIST_FAILURE,
  payload: error,
});

export const fetchPokemonsListData = (offset: number, limit: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPokemonsListRequest());
    try {
      const data = await fetchPokemonsList(offset, limit);
      dispatch(fetchPokemonsListSuccess(data));
    } catch (error: any) {
      dispatch(fetchPokemonsListFailure(error.message));
    }
  };
};

export const fetchPokemonRequest = () => ({
  type: FETCH_POKEMON_REQUEST,
});

export const fetchPokemonSuccess = (pokemon: Pokemon) => ({
  type: FETCH_POKEMON_SUCCESS,
  payload: pokemon,
});

export const fetchPokemonFailure = (error: string) => ({
  type: FETCH_POKEMON_FAILURE,
  payload: error,
});

export const fetchPokemonData = (name: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPokemonRequest());
    try {
      const data = await fetchPokemon(name);
      dispatch(fetchPokemonSuccess(data));
    } catch (error: any) {
      dispatch(fetchPokemonFailure(error.message));
    }
  };
};
