import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ServerError() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <Container component={Paper}>
      <Button onClick={() => navigate('/')}>Go back</Button>

      {state.error ? (
        <>
          <Typography variant="h4" gutterBottom color="error">
            {state.error.title}
          </Typography>
          <Divider />
          <Typography>{state.error.detail || 'Internal server error'}</Typography>
        </>
      ) : (
        <Typography variant="h5">Server Error</Typography>
      )}
    </Container>
  );
}
