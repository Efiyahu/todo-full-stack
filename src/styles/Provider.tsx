import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles';
import theme from './theme';

const StylesProvider = ({ children }: React.PropsWithChildren<Record<string, unknown>>) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default StylesProvider;
