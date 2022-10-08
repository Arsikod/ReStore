import { useProductsData } from '../../helpers/useProductData';
import ProductList from './ProductList';

export default function Catalog() {
  const { isLoading, data: products } = useProductsData();

  return <>{isLoading ? '...loading' : <ProductList products={products} />}</>;
}
