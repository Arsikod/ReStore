import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { BasketItem, IBasket } from '../../app/models/basket';
import BasketSummary from './BasketSummary';

export default function BasketPage() {
  const queryClient = useQueryClient();
  const basket = queryClient.getQueryData<IBasket>('basket');
  const [basketItemId, setBasketItemId] = useState<number>();

  const { mutate: addItem, isLoading: addItemProgress } = useMutation(
    (productId: number) => {
      setBasketItemId(productId);
      return agent.Basket.addItem(productId);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['basket']),
    }
  );

  const { mutate: removeItem, isLoading: removeItemProgress } = useMutation(
    (productId: number) => {
      setBasketItemId(productId);
      return agent.Basket.deleteItem(productId);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['basket']),
    }
  );

  const { mutate: deleteItem, isLoading: deleteItemProgress } = useMutation(
    (item: BasketItem) => {
      setBasketItemId(item.productId);
      return agent.Basket.deleteItem(item.productId, item.quantity);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['basket']),
    }
  );

  if (!basket?.items.length)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={removeItemProgress && item.productId === basketItemId}
                    color="error"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={addItemProgress && item.productId === basketItemId}
                    color="secondary"
                    onClick={() => addItem(item.productId)}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={deleteItemProgress && item.productId === basketItemId}
                    color="error"
                    onClick={() => deleteItem(item)}
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary basket={basket} />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
