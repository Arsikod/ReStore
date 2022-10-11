import { useQuery } from 'react-query';
import agent from '../app/api/agent';

export function useProduct(id: string) {
  return useQuery(['product', id], () => agent.Catalog.productDetails(id));
}
