import { createContext, useContext, useState, useEffect } from 'react';
import { colorThemes } from './themes';

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  colorTheme: 'obsidian',
  setColorTheme: () => {},
  colorThemes,
});

function applyTheme(colorThemeId, mode) {
  const ct = colorThemes.find((t) => t.id === colorThemeId) || colorThemes[0];
  const vars = mode === 'dark' ? ct.dark : ct.light;
  const root = document.documentElement;

  // Apply all core variables
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Derived shadcn compatibility variables
  root.style.setProperty('--card', vars.surface);
  root.style.setProperty('--card-foreground', vars.foreground);
  root.style.setProperty('--popover', vars.surface);
  root.style.setProperty('--popover-foreground', vars.foreground);
  root.style.setProperty('--secondary', vars['surface-elevated']);
  root.style.setProperty('--secondary-foreground', vars.foreground);
  root.style.setProperty('--muted', vars['surface-elevated']);
  root.style.setProperty('--muted-foreground', vars['foreground-muted']);
  root.style.setProperty('--input', vars.border);
  root.style.setProperty('--sidebar-background', vars.background);
  root.style.setProperty('--sidebar-foreground', vars['foreground-muted']);
  root.style.setProperty('--sidebar-primary', vars.primary);
  root.style.setProperty('--sidebar-primary-foreground', vars['primary-foreground']);
  root.style.setProperty('--sidebar-accent', vars['surface-elevated']);
  root.style.setProperty('--sidebar-accent-foreground', vars.foreground);
  root.style.setProperty('--sidebar-border', vars.border);
  root.style.setProperty('--sidebar-ring', vars.ring);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('portfolio_theme') || 'dark'; } catch { return 'dark'; }
  });
  const [colorTheme, setColorThemeState] = useState(() => {
    try { return localStorage.getItem('portfolio_color_theme_v2') || 'obsidian'; } catch { return 'obsidian'; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    applyTheme(colorTheme, theme);
    try { localStorage.setItem('portfolio_theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    applyTheme(colorTheme, theme);
    try { localStorage.setItem('portfolio_color_theme_v2', colorTheme); } catch {}
  }, [colorTheme, theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const setColorTheme = (id) => setColorThemeState(id);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, setColorTheme, colorThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}