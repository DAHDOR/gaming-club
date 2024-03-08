import { Dark, Theme } from '../config/Theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  ReactNode,
  createContext,
  useState,
  FC,
  useEffect,
  useContext,
} from 'react';
import { Light } from '../config/Theme';
import { useDarkTheme } from '../utils/CustomHooks';
import { PreferencesContext } from './PreferencesContext';

interface ThemeContextModel {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextModel>({
  theme: Light,
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Light);

  const { preferences } = useContext(PreferencesContext);

  const isDarkTheme = useDarkTheme();

  useEffect(() => {
    if (preferences.theme === 'system') {
      if (isDarkTheme) {
        setTheme(Dark);
      } else {
        setTheme(Light);
      }
    } else if (preferences.theme === 'dark') {
      setTheme(Dark);
    } else if (preferences.theme === 'light') {
      setTheme(Light);
    }
  }, [preferences, isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
