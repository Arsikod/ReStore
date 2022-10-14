import { useQuery } from 'react-query';
import agent from '../app/api/agent';

export function useFilters() {
  return useQuery(['filters'], agent.Catalog.filters);
}
