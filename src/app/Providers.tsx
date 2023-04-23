import React from 'react';
import StylesProvider from 'styles/Provider';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StylesProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </StylesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Providers;
