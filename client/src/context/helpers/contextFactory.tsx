import { createContext, useContext } from 'react';

export function contextFactory<T extends unknown | null>() {
  const context = createContext<T | undefined>(undefined);

  const useCtx = () => {
    const ctx = useContext(context);

    if (ctx === undefined) {
      throw new Error('useContext must be used inside of a Provider with a value');
    }
    return ctx;
  };

  return [useCtx, context] as const;
}
