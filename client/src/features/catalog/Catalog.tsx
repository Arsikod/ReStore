import { Grid, Paper } from '@mui/material';
import { useState } from 'react';
import CheckboxButtons from '../../app/components/CheckboxButtons';
import RadioButtonGroup from '../../app/components/RadioButtonGroup';
import { useFilters } from '../../helpers/useFilters';
import { useProductsData } from '../../helpers/useProductData';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import AddPagination from '../../app/components/AppPagination';

const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to low' },
  { value: 'price', label: 'Price - Low to high' },
];

export default function Catalog() {
  const { data: filters } = useFilters();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [brands, setBrands] = useState<Array<string>>([]);
  const [types, setTypes] = useState<Array<string>>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data } = useProductsData({
    pageNumber,
    pageSize: 6,
    orderBy: orderBy,
    searchTerm,
    brands: brands,
    types: types,
  });

  return (
    <>
      <Grid container columnSpacing={4}>
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
              onChange={(items: Array<string>) => {
                setBrands(items);
                setPageNumber(1);
              }}
            />
          </Paper>

          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckboxButtons
              checked={types}
              items={filters?.types}
              onChange={(items: Array<string>) => {
                setTypes(items);
                setPageNumber(1);
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <ProductList products={data?.items} />
        </Grid>

        <Grid item xs={3} />

        <Grid item xs={9} sx={{ mb: 2 }}>
          {data?.metaData && (
            <AddPagination metaData={data.metaData} onPageChange={setPageNumber} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
