import { Grid } from '@mui/material';
import { IProduct } from '../../app/models/product';
import ProductCard from './ProductCard';

interface IProductList {
  products: Array<IProduct> | undefined;
}

export default function ProductList({ products }: IProductList) {
  return (
    <Grid container spacing={4}>
      {products?.map((p) => (
        <Grid item xs={3} key={p.id}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
