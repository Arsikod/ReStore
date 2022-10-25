import { Button, Grid, Typography } from '@mui/material';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { IBasket } from '../../app/models/basket';
import BasketSummary from './BasketSummary';
import BasketTable from './BasketTable';

export default function BasketPage() {
  const queryClient = useQueryClient();
  const basket = queryClient.getQueryData<IBasket>('basket');

  if (!basket?.items.length)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <BasketTable />
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
