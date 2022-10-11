import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './features/about/AboutPage';
import Catalog from './features/catalog/Catalog';
import ProductDetails from './features/catalog/ProductDetails';
import ContactPage from './features/contact/ContactPage';
import HomePage from './features/home/HomePage';
import Header from './app/layout/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from './app/errors/ServerError';
import NotFound from './app/errors/NotFound';
import BasketPage from './features/basket/BasketPage';
import { useStoreContext } from './context/StoreContextValue';
import { useBasket } from './helpers/useBasket';
import LoadingComponent from './app/layout/LoadingComponent';

function App() {
  const { data: basket, isLoading } = useBasket();

  const { setBasket } = useStoreContext();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!isLoading && basket) setBasket(basket);
  }, [isLoading, setBasket, basket]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#eaeaea',
      },
    },
  });

  if (isLoading) return <LoadingComponent message="Loading..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" />
      <CssBaseline />
      <Header onThemeChange={() => setDarkMode(!darkMode)} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
