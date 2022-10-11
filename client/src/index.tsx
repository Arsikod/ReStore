import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StoreProvider } from './context/StoreContextValue';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HistoryRouter history={history}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </HistoryRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
