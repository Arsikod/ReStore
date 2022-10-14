import { Grid } from '@mui/material';
import { IProduct } from '../../app/models/product';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

interface IProductList {
  products: Array<IProduct> | undefined;
}

export default function ProductList({ products }: IProductList) {
  if (!products) {
    return (
      <Grid container spacing={4}>
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <Grid item xs={4} key={v}>
            <ProductCardSkeleton />{' '}
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={4}>
      {products?.map((p) => (
        <Grid item xs={4} key={p.id}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
