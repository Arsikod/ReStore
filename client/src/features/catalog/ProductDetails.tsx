import { LoadingButton } from '@mui/lab';
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import agent from '../../app/api/agent';
import NotFound from '../../app/errors/NotFound';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { IBasket } from '../../app/models/basket';
import { useProduct } from '../../helpers/useProduct';

export default function ProductDetails() {
  const { id } = useParams();
  const { isLoading, data: product } = useProduct(id!);

  const [quantity, setQuantity] = useState<number>(0);

  const queryClient = useQueryClient();
  const basket = queryClient.getQueryData<IBasket>('basket');
  const item = basket?.items.find((item) => item.productId === product?.id);

  const { mutate: addItem, isLoading: addItemProgress } = useMutation(
    ({ productId, quantity }: { productId: number; quantity: number }) =>
      agent.Basket.addItem(productId, quantity),
    {
      onSuccess: () => queryClient.invalidateQueries(['basket']),
    }
  );

  const { mutate: removeItem, isLoading: removeItemProgress } = useMutation(
    ({ productId, quantity }: { productId: number; quantity: number }) =>
      agent.Basket.deleteItem(productId, quantity),
    {
      onSuccess: () => queryClient.invalidateQueries(['basket']),
    }
  );

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      addItem({ productId: product?.id!, quantity: updatedQuantity });
    } else {
      const updatedQuantity = item.quantity - quantity;
      removeItem({ productId: product?.id!, quantity: updatedQuantity });
    }
  }

  if (isLoading) return <LoadingComponent message="loading product" />;

  if (!product) {
    return <NotFound />;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product?.pictureUrl} alt={product?.name} style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product?.name}</Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="h4" color="secondary">
          ${(product?.price! / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product?.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product?.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product?.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity || 0}
              onChange={(e) => {
                const { value } = e.target;

                if (parseInt(value) > 0) setQuantity(parseInt(value));
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={item?.quantity === quantity}
              sx={{ height: '55px' }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
              onClick={handleUpdateCart}
              loading={addItemProgress || removeItemProgress}
            >
              {item ? 'Update quantity' : 'Add to cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
