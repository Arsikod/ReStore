import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../app/models/user';

interface UserStore {
  user: User | null;
  roles?: Array<string> | null;
  setUser: (user: User, roles?: Array<string> | null) => void;
  removeUser: () => void;
}

export const useUserStore = create(
  persist<UserStore>((set) => ({
    user: null,
    roles: null,
    setUser: (user, roles) => {
      set({
        user,
        roles,
      });
    },
    removeUser: () => {
      set({
        user: null,
      });
    },
  }))
);
