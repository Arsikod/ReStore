import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useQuery } from 'react-query';
import agent from '../../app/api/agent';

export default function AboutPage() {
  const { error: validationError, refetch } = useQuery<unknown, Array<string>>(
    ['validation'],
    agent.TestErrors.validationError,
    {
      enabled: false,
    }
  );

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get400Error().catch(console.log)}
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get401Error().catch(console.log)}
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get404Error().catch(console.log)}
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.TestErrors.get500Error().catch(console.log)}
        >
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={() => refetch()}>
          Test validation Error
        </Button>
      </ButtonGroup>
      {validationError?.length && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationError.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
