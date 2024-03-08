import { ReactNode, createContext, useState } from 'react';
import User from '../models/User';

interface UserContextModel {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextModel>({
  user: new User(),
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(new User());

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};
