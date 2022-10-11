import { ReactNode, useState } from 'react';
import { IBasket } from '../app/models/basket';
import { contextFactory } from './helpers/contextFactory';

interface StoreContextValue {
  basket: IBasket | null;
  setBasket: (basket: IBasket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

const [useStoreContext, StoreContext] = contextFactory<StoreContextValue>();
export { useStoreContext };

interface Props {
  children: ReactNode;
}
export function StoreProvider({ children }: Props) {
  const [basket, setBasket] = useState<IBasket | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) return;

    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;

      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);

      setBasket((prevState) => {
        return { ...prevState!, items };
      });
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
