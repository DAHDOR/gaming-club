import { useEffect, useRef, useState } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const useDarkTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleThemeChange = (event: MediaQueryListEvent) => {
    setIsDarkTheme(event.matches);
  };

  useEffect(() => {
    const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    setIsDarkTheme(darkThemeQuery.matches);

    darkThemeQuery.addEventListener('change', handleThemeChange);

    return () => {
      darkThemeQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return isDarkTheme;
};
