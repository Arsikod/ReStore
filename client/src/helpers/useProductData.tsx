import axios from 'axios';
import { useQuery } from 'react-query';
import { IProduct } from '../app/models/product';

export function useProductsData() {
  async function getProducts(): Promise<Array<IProduct>> {
    const response = await axios.get(`http://localhost:5000/api/products`);
    return response.data;
  }

  return useQuery(['products'], getProducts);
}
