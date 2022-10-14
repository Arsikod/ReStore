import { Box, Grid, Pagination, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useFilters } from '../../helpers/useFilters';
import { useProductsData } from '../../helpers/useProductData';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

export default function Catalog() {
  const { isLoading: filtersLoading, data: filters } = useFilters();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [brands, setBrands] = useState<Array<string>>([]);
  const [types, setTypes] = useState<Array<string>>([]);

  const { isLoading: productsLoading, data: products } = useProductsData({
    pageNumber: 1,
    pageSize: 6,
    orderBy: orderBy || 'name',
    searchTerm,
    brands,
    types,
  });

  return (
    <>
      {productsLoading || filtersLoading ? (
        <LoadingComponent message="Loading products" />
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Paper sx={{ mb: 2 }}>
              <ProductSearch
                onChange={(e) => setSearchTerm(e.target.value)} //todo debounce
                value={searchTerm}
              />
            </Paper>
            <Paper sx={{ mb: 2, p: 2 }}>
              <RadioButtonGroup
                options={sortOptions}
                selectedValue={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              />
            </Paper>

            <Paper sx={{ mb: 2, p: 2 }}>
              <CheckboxButtons
                checked={brands}
                items={filters?.brands}
                onChange={setBrands}
              />
            </Paper>

            <Paper sx={{ mb: 2, p: 2 }}>
              <CheckboxButtons
                checked={types}
                items={filters?.types}
                onChange={setTypes}
              />
            </Paper>
          </Grid>

          <Grid item xs={9}>
            <ProductList products={products} />
          </Grid>

          <Grid item xs={3} />

          <Grid item xs={9}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Displaying 1-6 of 20 items</Typography>
              <Pagination color="secondary" size="large" count={10} page={2} />
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
