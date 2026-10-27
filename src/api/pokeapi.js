// Запросы к public API https://pokeapi.co
const API_URL = 'https://pokeapi.co/api/v2';

const NOT_FOUND_MESSAGE = 'Такой покемон не найден';

export class NotFoundError extends Error {
  constructor(message = NOT_FOUND_MESSAGE) {
    super(message);
  }
}

async function request(url, signal) {
  const response = await fetch(url, { signal });
  // 404 - такого покемона нет, 400 - API не принимает такое имя (например, с недопустимыми символами)
  if (response.status === 404 || response.status === 400) {
    throw new NotFoundError();
  }
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

// Первые 20 покемонов: [{ name, url }]
export async function fetchPokemonList(signal) {
  const data = await request(`${API_URL}/pokemon`, signal);
  return data.results;
}

// Мемоизация запросов: данные покемона загружаются один раз и берутся из кэша,
// например когда покемона удалили и снова нашли через поиск
const detailsCache = new Map();

export function getCachedPokemonDetails(url) {
  return detailsCache.get(url);
}

export async function fetchPokemonDetails(url, signal) {
  if (detailsCache.has(url)) {
    return detailsCache.get(url);
  }
  const data = await request(url, signal);
  detailsCache.set(url, data);
  return data;
}

// Поиск по имени. Возвращает { name, url } в том же виде, что и элементы списка
export async function findPokemon(name, signal) {
  const normalized = name.trim().toLowerCase();
  // В pokeapi нет русских названий - подсказываем, как искать
  if (/[а-яё]/.test(normalized)) {
    throw new NotFoundError(`${NOT_FOUND_MESSAGE}. Имена ищутся на английском, например pikachu`);
  }
  // Составные имена в API пишутся через дефис: "mr mime" -> "mr-mime"
  const query = encodeURIComponent(normalized.replace(/\s+/g, '-'));
  const data = await request(`${API_URL}/pokemon/${query}`, signal);
  const url = `${API_URL}/pokemon/${data.id}/`;
  // Ответ поиска - это те же подробные данные, кладём их в кэш, чтобы карточка не запрашивала их снова
  detailsCache.set(url, data);
  return { name: data.name, url };
}
