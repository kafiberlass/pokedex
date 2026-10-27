import { memo } from 'react';
import { useSelector } from 'react-redux';
import PokemonListItem from './PokemonListItem';
import { useTheme, themed } from '../context/ThemeContext';
import { selectPokemons } from '../store/selectors';

function PokemonList() {
  // Список берём прямо из стора
  const pokemons = useSelector(selectPokemons);
  const { isLight } = useTheme();

  if (pokemons.length === 0) {
    return <p className={themed('empty', isLight)}>Список пуст. Найди покемона через поиск!</p>;
  }

  return (
    <ul className="pokemon-grid">
      {pokemons.map(({ name, url }) => (
        <PokemonListItem key={name} name={name} url={url} />
      ))}
    </ul>
  );
}

export default memo(PokemonList);
