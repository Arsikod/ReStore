import { Typography, Grid, Paper, Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import AppDropzone from '../../app/components/AppDropzone';
import AppSelectList from '../../app/components/AppSelectList';
import AppTextInput from '../../app/components/AppTextInput';
import { IProduct } from '../../app/models/product';
import { useFilters } from '../../helpers/useFilters';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './productValidation';

interface Props {
  product?: IProduct;
  cancelEdit: () => void;
}

export interface IProductForm {
  brand: string;
  description: string;
  file: File;
  id: number;
  name: string;
  price: number;
  publicId?: number;
  quantityInStock: string;
  type: string;
}

export default function ProductForm({ product, cancelEdit }: Props) {
  const { control, reset, handleSubmit, watch } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { data: filters } = useFilters();

  const watchFile = watch('file');

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  async function handleSubmitData(data: FieldValues) {
    console.log(data);
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Product Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="name" label="Product name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              items={filters?.brands}
              control={control}
              name="brand"
              label="Brand"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectList
              items={filters?.types}
              control={control}
              name="type"
              label="Type"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput type="number" control={control} name="price" label="Price" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label="Quantity in Stock"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              rows={4}
              control={control}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <AppDropzone name="file" control={control} />
              {watchFile ? (
                <img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
              ) : (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
