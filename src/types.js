// Цвета и русские названия типов покемонов
export const TYPES = {
  normal: { label: 'Обычный', color: '#a8a77a' },
  fire: { label: 'Огонь', color: '#ee8130' },
  water: { label: 'Вода', color: '#6390f0' },
  electric: { label: 'Электро', color: '#e3b51b' },
  grass: { label: 'Трава', color: '#5fb84a' },
  ice: { label: 'Лёд', color: '#62c8c4' },
  fighting: { label: 'Боевой', color: '#c22e28' },
  poison: { label: 'Яд', color: '#a33ea1' },
  ground: { label: 'Земля', color: '#c9a64f' },
  flying: { label: 'Летающий', color: '#8f7ee8' },
  psychic: { label: 'Психический', color: '#f95587' },
  bug: { label: 'Жук', color: '#97a91a' },
  rock: { label: 'Камень', color: '#b6a136' },
  ghost: { label: 'Призрак', color: '#735797' },
  dragon: { label: 'Дракон', color: '#6f35fc' },
  dark: { label: 'Тьма', color: '#705746' },
  steel: { label: 'Сталь', color: '#8f8fb0' },
  fairy: { label: 'Фея', color: '#d685ad' },
};

export const getType = (name) => TYPES[name] ?? { label: name, color: '#8a8a8a' };
