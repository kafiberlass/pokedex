// Reducer - чистая функция: не мутирует state, а возвращает новый объект
import {
  LOAD_POKEMONS_START,
  LOAD_POKEMONS_SUCCESS,
  LOAD_POKEMONS_FAILURE,
  ADD_POKEMON,
  DELETE_POKEMON,
  SET_MESSAGE,
} from './actionTypes';

export const initialState = {
  pokemons: [],
  isLoading: true,
  message: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_POKEMONS_START:
      return { ...state, isLoading: true, message: '' };

    case LOAD_POKEMONS_SUCCESS:
      return { ...state, isLoading: false, pokemons: action.payload };

    case LOAD_POKEMONS_FAILURE:
      return { ...state, isLoading: false, message: action.payload };

    // Найденный покемон встаёт в начало списка (без дубликата, если он уже был)
    case ADD_POKEMON:
      return {
        ...state,
        message: '',
        pokemons: [action.payload, ...state.pokemons.filter((item) => item.name !== action.payload.name)],
      };

    case DELETE_POKEMON:
      return { ...state, pokemons: state.pokemons.filter((item) => item.name !== action.payload) };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    default:
      return state;
  }
}
