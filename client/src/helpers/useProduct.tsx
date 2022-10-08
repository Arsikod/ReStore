import axios from 'axios';
import { useQuery } from 'react-query';
import { IProduct } from '../app/models/product';

export function useProduct(id: string) {
  async function getProductById(): Promise<IProduct> {
    const response = await axios.get(`http://localhost:5000/api/products/${id}`);
    return response.data;
  }

  return useQuery(['product', id], getProductById);
}
