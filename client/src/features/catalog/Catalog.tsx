import LoadingComponent from '../../app/layout/LoadingComponent';
import { useProductsData } from '../../helpers/useProductData';
import ProductList from './ProductList';

export default function Catalog() {
  const { isLoading, data: products } = useProductsData();

  return (
    <>
      {isLoading ? (
        <LoadingComponent message="Loading products" />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
