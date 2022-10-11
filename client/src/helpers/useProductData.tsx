import { useQuery } from 'react-query';
import agent from '../app/api/agent';

export function useProductsData() {
  return useQuery(['products'], agent.Catalog.products);
}
