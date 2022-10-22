import { useQuery } from 'react-query';
import agent from '../app/api/agent';

export function useCurrentUser() {
  return useQuery(['currentUser', agent.Account.currentUser]);
}
