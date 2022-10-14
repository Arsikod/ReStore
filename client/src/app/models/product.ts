export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
}

export interface IProductParams {
  orderBy: string;
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  types: Array<string>;
  brands: Array<string>;
}
