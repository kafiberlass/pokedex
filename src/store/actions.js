// Action creators: в dispatch передаём результат их вызова, а не объект действия напрямую
import {
  LOAD_POKEMONS_START,
  LOAD_POKEMONS_SUCCESS,
  LOAD_POKEMONS_FAILURE,
  ADD_POKEMON,
  DELETE_POKEMON,
  SET_MESSAGE,
} from './actionTypes';

export const loadPokemonsStart = () => ({ type: LOAD_POKEMONS_START });

export const loadPokemonsSuccess = (pokemons) => ({ type: LOAD_POKEMONS_SUCCESS, payload: pokemons });

export const loadPokemonsFailure = (message) => ({ type: LOAD_POKEMONS_FAILURE, payload: message });

// pokemon: { name, url }
export const addPokemon = (pokemon) => ({ type: ADD_POKEMON, payload: pokemon });

export const deletePokemon = (name) => ({ type: DELETE_POKEMON, payload: name });

export const setMessage = (message) => ({ type: SET_MESSAGE, payload: message });
