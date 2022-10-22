import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../app/models/user';

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const useUserStore = create(
  persist<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => {
      set({
        user,
      });
    },
    removeUser: () => {
      set({
        user: null,
      });
    },
  }))
);
