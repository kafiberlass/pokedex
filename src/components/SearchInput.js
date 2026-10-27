import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { findPokemon, NotFoundError } from '../api/pokeapi';
import { addPokemon, setMessage } from '../store/actions';
import { useTheme, themed } from '../context/ThemeContext';

// Текст поиска хранится внутри компонента: набор текста перерисовывает только поле
function SearchInput() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const { isLight } = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    dispatch(setMessage(''));
    try {
      const pokemon = await findPokemon(query);
      dispatch(addPokemon(pokemon));
      setQuery('');
    } catch (error) {
      dispatch(
        setMessage(error instanceof NotFoundError ? error.message : 'Ошибка при поиске, попробуйте ещё раз')
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form className={themed('search', isLight)} onSubmit={handleSubmit} role="search">
      <input
        className="search__input"
        type="search"
        placeholder="Найди покемона: pikachu, eevee, mew…"
        aria-label="Имя покемона"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button className="search__button" type="submit" disabled={isSearching}>
        {isSearching ? 'Ищем…' : 'Найти'}
      </button>
    </form>
  );
}

export default memo(SearchInput);
