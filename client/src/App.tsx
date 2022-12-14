import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
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
import Login from './features/account/Login';
import Register from './features/account/Register';
import { ReactQueryDevtools } from 'react-query/devtools';
import ProtectedRoute from './app/layout/ProtectedRoute';
import { useUserStore } from './stores/User';
import Order from './features/orders/Orders';
import OrderDetail from './features/orders/OrderDetail';
import CheckoutWrapper from './features/checkout/CheckoutWrapper';
import Inventory from './features/admin/Inventory';

function App() {
  const user = useUserStore((state) => state.user);
  const roles = useUserStore((state) => state.roles);

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#eaeaea',
      },
    },
  });

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

          <Route
            path="/checkout"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <CheckoutWrapper />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <Order />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <OrderDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedRoute isAllowed={Boolean(roles?.includes('Admin'))}>
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default App;
