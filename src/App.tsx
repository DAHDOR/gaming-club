import Router from './Router';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './config/ErrorBoundary';
import GlobalStyle from './config/GlobalStyle';
import { PreferencesProvider } from './context/PreferencesContext';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <AuthProvider>
          <PreferencesProvider>
            <ThemeProvider>
              <GlobalStyle />
              <Router />
            </ThemeProvider>
          </PreferencesProvider>
        </AuthProvider>
      </ProfileProvider>
    </ErrorBoundary>
  );
}

export default App;
