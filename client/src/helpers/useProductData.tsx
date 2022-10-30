import { useQuery } from 'react-query';
import agent from '../app/api/agent';
import { getAxiosParams } from '../app/api/getAxiosParams';
import { IProductParams } from '../app/models/product';

export function useProductsData(params?: IProductParams) {
  return useQuery(['products', params], () => {
    const requestParams = params ? getAxiosParams(params) : undefined;

    return agent.Catalog.products(requestParams);
  });
}
