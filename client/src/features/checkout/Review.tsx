import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useQueryClient } from 'react-query';
import { IBasket } from '../../app/models/basket';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';

export default function Review() {
  const queryClient = useQueryClient();
  const basket = queryClient.getQueryData<IBasket>('basket');

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <BasketTable isBasket={false} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary basket={basket} />
        </Grid>
      </Grid>
    </>
  );
}
