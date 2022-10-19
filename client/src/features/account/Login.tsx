import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLogin } from '../../helpers/useLogin';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';

export default function Login() {
  const { mutate: login, isLoading } = useLogin();

  const { register, handleSubmit } = useForm<LoginCredentials>();

  function submitForm(data: LoginCredentials) {
    login(data);
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
        <TextField margin="normal" fullWidth label="Username" {...register('username')} />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register('password')}
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/register">Dont have an account? Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
