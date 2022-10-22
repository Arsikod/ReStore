import { ShoppingCart } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  AppBar,
  Badge,
  Box,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useBasket } from '../../helpers/useBasket';
import { useUserStore } from '../../stores/User';
import SignedInMenu from './SignedInMenu';

interface IHeader {
  onThemeChange: () => void;
}

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
};

const pageLinks = [
  { title: 'about', path: '/about' },
  { title: 'catalog', path: '/catalog' },
  { title: 'contact', path: '/contact' },
];

const authLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

export default function Header({ onThemeChange }: IHeader) {
  const user = useUserStore((state) => state.user);
  const { data: basket, isLoading } = useBasket();

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box display="flex" alignItems="center">
          <Typography {...{ component: NavLink, to: '/' }} variant="h6" sx={navStyles}>
            RE-STORE
          </Typography>
          <Switch onChange={onThemeChange} />
        </Box>
        <List sx={{ display: 'flex' }}>
          {pageLinks.map(({ title, path }) => (
            <ListItem key={path} {...{ component: NavLink, to: path }} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <LoadingButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: 'inherit' }}
            loading={isLoading}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </LoadingButton>
          {user ? (
            <SignedInMenu user={user} />
          ) : (
            <List sx={{ display: 'flex' }}>
              {authLinks.map(({ title, path }) => (
                <ListItem key={path} {...{ component: NavLink, to: path }} sx={navStyles}>
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
