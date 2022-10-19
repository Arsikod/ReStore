import { useMutation } from 'react-query';
import agent, { LoginCredentials } from '../app/api/agent';

export function useLogin() {
  return useMutation((values: LoginCredentials) => agent.Account.login(values));
}
