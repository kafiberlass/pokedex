import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// В контексте хранится isLight (по умолчанию true) и функция переключения темы
const ThemeContext = createContext({ isLight: true, toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [isLight, setIsLight] = useState(true);

  const toggleTheme = useCallback(() => setIsLight((prev) => !prev), []);

  // Объект value пересоздаётся только при смене темы, иначе все подписчики перерисовывались бы зря
  const value = useMemo(() => ({ isLight, toggleTheme }), [isLight, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

// Добавляет к CSS-классу модификатор тёмной темы: themed('search', false) -> 'search search_dark'
export const themed = (className, isLight) => (isLight ? className : `${className} ${className}_dark`);
