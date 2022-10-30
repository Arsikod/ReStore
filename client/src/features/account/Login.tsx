import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import agent, { LoginCredentials } from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { useMutation, useQueryClient } from 'react-query';
import { useUserStore } from '../../stores/User';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: login, isLoading } = useMutation(
    (values: LoginCredentials) => agent.Account.login(values),
    {
      onSuccess: (userDto) => {
        const { basket, ...user } = userDto;

        if (user) {
          let claims = JSON.parse(atob(user.token.split('.')[1]));
          let roles = [].concat(
            claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          );

          setUser(user, roles);
          queryClient.setQueryData('basket', () => basket);

          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginCredentials>({
    mode: 'all',
  });

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
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          {...register('username', { required: 'Username is required' })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isValid}
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
