import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from './components/SearchInput';
import PokemonList from './components/PokemonList';
import ThemeToggle from './components/ThemeToggle';
import { fetchPokemonList } from './api/pokeapi';
import { useTheme, themed } from './context/ThemeContext';
import { loadDefaultList, saveDefaultList } from './storage';
import { loadPokemonsStart, loadPokemonsSuccess, loadPokemonsFailure } from './store/actions';
import { selectIsLoading, selectMessage, selectPokemonsCount } from './store/selectors';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const message = useSelector(selectMessage);
  const count = useSelector(selectPokemonsCount);
  const { isLight } = useTheme();

  // При первом рендере: данные из localStorage кладём в стор.
  // Если их нет - отправляем запрос и сохраняем результат и в localStorage, и в стор
  useEffect(() => {
    const savedList = loadDefaultList();
    if (savedList) {
      dispatch(loadPokemonsSuccess(savedList));
      return undefined;
    }

    const controller = new AbortController();
    dispatch(loadPokemonsStart());

    fetchPokemonList(controller.signal)
      .then((list) => {
        saveDefaultList(list);
        dispatch(loadPokemonsSuccess(list));
      })
      .catch((error) => {
        if (error.name !== 'AbortError') dispatch(loadPokemonsFailure('Не удалось загрузить список покемонов'));
      });

    return () => controller.abort();
  }, [dispatch]);

  return (
    <div className={themed('page', isLight)}>
      <header className={themed('header', isLight)}>
        <div className="header__inner">
          <span className="pokeball" aria-hidden="true" />
          <div>
            <h1 className="header__title">Покедекс</h1>
            <p className="header__subtitle">{isLoading ? 'Загружаем покемонов…' : `Покемонов в списке: ${count}`}</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container">
        {/* Данные компоненты берут из стора сами - пропсы по цепочке больше не передаются */}
        <SearchInput />
        {message && (
          <p className={themed('toast', isLight)} role="alert">
            {message}
          </p>
        )}
        {isLoading ? <SkeletonList /> : <PokemonList />}
      </main>
    </div>
  );
}

function SkeletonList() {
  const { isLight } = useTheme();

  return (
    <ul className="pokemon-grid" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <li key={index} className={`${themed('pokemon-card', isLight)} pokemon-card_skeleton`} />
      ))}
    </ul>
  );
}

export default App;
