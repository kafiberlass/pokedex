import { memo, useEffect, useMemo, useState } from 'react';
import { fetchPokemonDetails, getCachedPokemonDetails } from '../api/pokeapi';
import { getType } from '../types';
import { useTheme, themed } from '../context/ThemeContext';

// Для каждого покемона отдельно запрашиваем подробную информацию
function PokemonCard({ url }) {
  // Если данные уже есть в кэше, показываем их сразу, без состояния загрузки
  const [pokemon, setPokemon] = useState(() => getCachedPokemonDetails(url) ?? null);
  const [error, setError] = useState(false);
  const { isLight } = useTheme();
  const cardClass = themed('pokemon-card', isLight);

  useEffect(() => {
    if (getCachedPokemonDetails(url)) return undefined;
    const controller = new AbortController();

    fetchPokemonDetails(url, controller.signal)
      .then(setPokemon)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(true);
      });

    return () => controller.abort();
  }, [url]);

  // Формы, типы и цвет карточки вычисляются только когда приходят новые данные
  const view = useMemo(() => {
    if (!pokemon) return null;
    const types = pokemon.types.map(({ type }) => ({ name: type.name, ...getType(type.name) }));
    return {
      forms: pokemon.forms.map((form) => form.name),
      types,
      color: types[0]?.color ?? '#8a8a8a',
      number: `#${String(pokemon.id).padStart(3, '0')}`,
    };
  }, [pokemon]);

  if (error) {
    return <article className={`${cardClass} pokemon-card_error`}>Не удалось загрузить покемона</article>;
  }
  if (!view) {
    return <article className={`${cardClass} pokemon-card_skeleton`} aria-label="Загрузка" />;
  }

  return (
    <article className={cardClass} style={{ '--type-color': view.color }}>
      <span className="pokemon-card__number">{view.number}</span>
      <div className="pokemon-card__image-wrap">
        <img className="pokemon-card__image" src={pokemon.sprites.front_default} alt={pokemon.name} width="96" height="96" />
      </div>
      <h2 className="pokemon-card__name">{pokemon.name}</h2>

      <ul className="chips" aria-label="Типы">
        {view.types.map((type) => (
          <li key={type.name} className="chip chip_type" style={{ '--chip-color': type.color }}>
            {type.label}
          </li>
        ))}
      </ul>

      <p className="pokemon-card__forms-title">Формы: {view.forms.length}</p>
      <ul className="chips" aria-label="Формы">
        {view.forms.map((form) => (
          <li key={form} className={themed('chip', isLight)}>
            {form}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default memo(PokemonCard);
