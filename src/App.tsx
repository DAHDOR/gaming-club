import Router from './Router';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './config/ErrorBoundary';
import GlobalStyle from './config/GlobalStyle';
import { UserProvider } from './context/UserContext';
import { PreferencesProvider } from './context/PreferencesContext';

function App() {
  return (
    <ErrorBoundary>
      <PreferencesProvider>
        <UserProvider>
          <ThemeProvider>
            <GlobalStyle />
            <Router />
          </ThemeProvider>
        </UserProvider>
      </PreferencesProvider>
    </ErrorBoundary>
  );
}

export default App;
