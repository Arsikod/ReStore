import { Button, Menu, Fade, MenuItem } from '@mui/material';
import React from 'react';
import { useQueryClient } from 'react-query';
import { history } from '../..';
import { useUserStore } from '../../stores/User';
import { User } from '../models/user';

export default function SignedInMenu({ user }: { user: User }) {
  const queryClient = useQueryClient();

  const removeUser = useUserStore((state) => state.removeUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" sx={{ typography: 'h6' }} onClick={handleClick}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem
          onClick={() => {
            removeUser();
            queryClient.removeQueries('basket');
            history.push('/');
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
