import { combineReducers } from "redux";
import {
  FETCH_POKEMONS_LIST_REQUEST,
  FETCH_POKEMONS_LIST_SUCCESS,
  FETCH_POKEMONS_LIST_FAILURE,
  FETCH_POKEMON_REQUEST,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_FAILURE,
} from "./actions";
import { Pokemon } from "../interfaces/pokemon.interface";
import { PokemonListItem } from "../interfaces/pokemon-list-item.interface";

export interface PokemonState {
  pokemon: Pokemon | null;
  pokemonList: PokemonListItem[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemon: null,
  pokemonList: [],
  loading: false,
  error: null,
};

export const pokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_POKEMONS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POKEMONS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemonList: action.payload,
      };
    case FETCH_POKEMONS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_POKEMON_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemon: action.payload,
      };
    case FETCH_POKEMON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export default rootReducer;
