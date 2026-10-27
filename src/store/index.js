import { createStore } from 'redux';
import { reducer } from './reducer';

// Единый стор - источник истины для всего приложения
const store = createStore(reducer);

export default store;
