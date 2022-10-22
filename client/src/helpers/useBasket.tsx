import { useQuery } from 'react-query';
import agent from '../app/api/agent';

export function useBasket() {
  return useQuery(['basket'], agent.Basket.get);
}
