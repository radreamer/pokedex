import { pokemonReducer } from "../reducers";
import {
  fetchPokemonRequest,
  fetchPokemonSuccess,
  fetchPokemonsListFailure,
  fetchPokemonsListRequest,
  fetchPokemonsListSuccess,
} from "../actions";

const initialState = {
  pokemon: null,
  pokemonList: [],
  loading: false,
  error: null,
};

describe("pokemonReducer test", () => {
  it("should handle FETCH_POKEMONS_LIST_REQUEST dispatch", () => {
    const action = fetchPokemonsListRequest();
    const newState = pokemonReducer(initialState, action);

    expect(newState.loading).toEqual(true);
    expect(newState.error).toEqual(null);
  });

  it("should handle FETCH_POKEMONS_LIST_FAILURE dispatch", () => {
    const error = "Internal error";
    const action = fetchPokemonsListFailure(error);
    const newState = pokemonReducer(initialState, action);

    expect(newState.loading).toEqual(false);
    expect(newState.error).toEqual(error);
  });

  it("should handle FETCH_POKEMONS_LIST_SUCCESS dispatch", () => {
    const pokemonsList = [
      {
        name: "caterpie",
        url: "https://pokeapi.co/api/v2/pokemon/10/",
      },
    ];
    const action = fetchPokemonsListSuccess(pokemonsList);
    const newState = pokemonReducer(initialState, action);

    expect(newState.loading).toEqual(false);
    expect(newState.pokemonList).toEqual(pokemonsList);
  });

  it("should handle FETCH_POKEMON_REQUEST dispatch", () => {
    const action = fetchPokemonRequest();
    const newState = pokemonReducer(initialState, action);

    expect(newState.loading).toEqual(true);
    expect(newState.error).toEqual(null);
  });

  it("should handle FETCH_POKEMON_FAILURE dispatch", () => {
    const error = "Internal error";
    const action = fetchPokemonsListFailure(error);
    const newState = pokemonReducer(initialState, action);

    expect(newState.loading).toEqual(false);
    expect(newState.error).toEqual(error);
  });

  it("should handle FETCH_POKEMON_SUCCESS dispatch", () => {
    const pokemon = [
      {
        height: 6,
        weight: 100,
        types: [
          {
            type: {
              name: "bug",
            },
          },
        ],
        stats: [
          {
            base_stat: 45,
            stat: {
              name: "hp",
            },
          },
        ],
      },
    ];
    const action = fetchPokemonSuccess(pokemon);
    const newState = pokemonReducer(initialState, action);

    expect(newState.loading).toEqual(false);
    expect(newState.pokemon).toEqual(pokemon);
  });
});
