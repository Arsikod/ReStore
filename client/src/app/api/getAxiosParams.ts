import { IProductParams } from './../models/product';

export function getAxiosParams(productParams: IProductParams) {
  const params = new URLSearchParams();

  params.append('pageNumber', productParams.pageNumber.toString());

  params.append('pageSize', productParams.pageSize?.toString() ?? '6');
  params.append('orderBy', productParams.orderBy ?? 'name');

  if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
  if (productParams.brands?.length)
    params.append('brands', productParams.brands.toString());

  if (productParams.types?.length) params.append('types', productParams.types.toString());

  return params;
}
