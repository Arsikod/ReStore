import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { IProduct } from '../../app/models/product';
import { currencyFormat } from '../../app/util/util';

interface IProductCard {
  product: IProduct;
}

export default function ProductCard({ product }: IProductCard) {
  const queryClient = useQueryClient();
  const { name, pictureUrl, price, brand, type, id } = product;

  const { isLoading, mutate } = useMutation(
    (productId: number) => agent.Basket.addItem(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['basket']);
      },
    }
  );

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold' },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'contain',
          bgcolor: 'primary.light',
        }}
        image={pictureUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          {currencyFormat(price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {brand} / {type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={isLoading} onClick={() => mutate(id)} size="small">
          Add to cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
