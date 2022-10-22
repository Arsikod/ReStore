import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../app/models/user';

export const useUserStore = create(
  persist(() => ({
    user: null,
    addUser: (user: User) => ({ user }),
  }))
);
