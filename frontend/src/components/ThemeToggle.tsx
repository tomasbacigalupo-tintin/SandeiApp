import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Button } from './ui/button';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={
        theme === 'light' ? 'Activar modo oscuro' : 'Desactivar modo oscuro'
      }
    >
      {theme === 'light' ? (
        <FaMoon aria-hidden="true" />
      ) : (
        <FaSun aria-hidden="true" />
      )}
    </Button>
  );
}
