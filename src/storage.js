// Работа с localStorage: дефолтный список из 20 покемонов храним в браузере,
// чтобы не запрашивать его заново при каждом обновлении страницы
const DEFAULT_LIST_KEY = 'pokedex:default-list';

const isPokemonList = (value) =>
  Array.isArray(value) && value.every((item) => typeof item?.name === 'string' && typeof item?.url === 'string');

export function loadDefaultList() {
  try {
    const value = JSON.parse(localStorage.getItem(DEFAULT_LIST_KEY));
    return isPokemonList(value) ? value : null;
  } catch {
    // Хранилище недоступно или в нём испорченные данные - просто загрузим список заново
    return null;
  }
}

export function saveDefaultList(list) {
  try {
    localStorage.setItem(DEFAULT_LIST_KEY, JSON.stringify(list));
  } catch {
    // Если сохранить не получилось (например, приватный режим), приложение всё равно работает
  }
}
