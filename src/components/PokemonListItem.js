import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PokemonCard from './PokemonCard';
import { deletePokemon } from '../store/actions';

function PokemonListItem({ name, url }) {
  const dispatch = useDispatch();

  // Удаление - через action, без обработчика, переданного от родителя
  const handleDelete = useCallback(() => dispatch(deletePokemon(name)), [dispatch, name]);

  return (
    <li className="pokemon-grid__item">
      <PokemonCard url={url} />
      <button className="delete-button" type="button" aria-label={`Удалить ${name}`} title="Удалить" onClick={handleDelete}>
        ×
      </button>
    </li>
  );
}

// При добавлении или удалении покемона уже показанные карточки не перерисовываются
export default memo(PokemonListItem);
