import { useQuery } from 'react-query';
import agent from '../app/api/agent';
import { getCookie } from '../app/util/util';
import { useUserStore } from '../stores/User';

export function useBasket() {
  return useQuery(['basket'], agent.Basket.get, {
    enabled: Boolean(getCookie('buyerId') || useUserStore.getState().user?.token),
  });
}
