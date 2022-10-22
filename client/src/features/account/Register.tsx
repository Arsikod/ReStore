import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import agent, { RegisterCredentials } from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { history } from '../..';

export default function Register() {
  const { mutate: signUp, isLoading } = useMutation(
    (values: RegisterCredentials) => agent.Account.register(values),
    {
      onSuccess: () => {
        toast.success('Registration successfull, please login');
        history.push('/login');
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterCredentials>({
    mode: 'all',
  });

  function submitForm(data: RegisterCredentials) {
    signUp(data);
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
        Register{' '}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
        <TextField
          autoFocus
          margin="normal"
          fullWidth
          label="Username"
          {...register('username', {
            required: 'Username is required',
          })}
          error={Boolean(errors.username)}
          helperText={errors.username?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: 'Not a valid email address',
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message: 'Invalid password',
            },
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
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login">Already have an account? Sign Up</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
