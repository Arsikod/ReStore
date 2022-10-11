import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useStoreContext } from '../../context/StoreContextValue';

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
  const { basket } = useStoreContext();

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
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: 'inherit' }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {authLinks.map(({ title, path }) => (
              <ListItem key={path} {...{ component: NavLink, to: path }} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
