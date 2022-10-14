import { IProductParams } from './../models/product';

export function getAxiosParams(productParams: IProductParams) {
  const params = new URLSearchParams();
  params.append('pageNumber', productParams.pageNumber.toString());
  params.append('pageSize', productParams.pageSize.toString());
  params.append('orderBy', productParams.orderBy);
  if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
  if (productParams.brands) params.append('brands', productParams.brands.toString());
  if (productParams.types) params.append('types', productParams.types.toString());

  return params;
}
