import { useQuery } from 'react-query';
import agent from '../app/api/agent';
import { getCookie } from '../app/util/util';

export function useBasket() {
  return useQuery(['basket'], agent.Basket.get);
}
