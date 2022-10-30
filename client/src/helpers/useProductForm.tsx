import { useMutation } from 'react-query';
import agent from '../app/api/agent';
import { IProduct } from '../app/models/product';
import { IProductForm } from '../features/admin/ProductForm';

export function useUpdateProduct() {
  return useMutation((value: IProductForm) => agent.Admin.updateProduct(value));
}

export function useCreateProduct() {
  return useMutation((value: IProductForm) => agent.Admin.updateProduct(value));
}
