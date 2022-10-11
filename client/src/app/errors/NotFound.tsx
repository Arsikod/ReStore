import { Button, Divider, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant="h3">
        Opps - we could not find what you are looking for
      </Typography>
      <Divider />

      <Button component={Link} to="/catalog" fullWidth>
        Back to shopping
      </Button>
    </Container>
  );
}