import { ReactNode, createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../config/Firebase';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<User | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
