import { useTheme, themed } from '../context/ThemeContext';

// Переключатель темы, как на макете: подпись "Dark theme" и тумблер
function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme();

  return (
    <label className={themed('theme-toggle', isLight)}>
      <span className="theme-toggle__label">Dark theme</span>
      <input
        className="theme-toggle__input"
        type="checkbox"
        role="switch"
        checked={!isLight}
        onChange={toggleTheme}
      />
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
    </label>
  );
}

export default ThemeToggle;
