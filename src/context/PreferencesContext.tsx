import { ReactNode, createContext, useState } from 'react';

interface Preferences {
  theme: string;
}

const DEFAULT_PREFERENCES: Preferences = {
  theme: 'system',
};

interface PreferencesContextModel {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
}

export const PreferencesContext = createContext<PreferencesContextModel>({
  preferences: DEFAULT_PREFERENCES,
  setPreferences: () => {},
});

interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
  const [preferences, setPreferences] =
    useState<Preferences>(DEFAULT_PREFERENCES);

  return (
    <PreferencesContext.Provider
      value={{ preferences: preferences, setPreferences: setPreferences }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
