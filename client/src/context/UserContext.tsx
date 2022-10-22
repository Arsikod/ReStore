import { ReactNode, useCallback, useState } from 'react';
import { User } from '../app/models/user';
import { contextFactory } from './helpers/contextFactory';

interface UserContextValue {
  user: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;
}

const [useUserContext, UserContext] = contextFactory<UserContextValue>();
export { useUserContext };

interface IUserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const addUser = useCallback(
    (user: User) => {
      setUser(user);
    },
    [setUser]
  );

  const removeUser = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
}
