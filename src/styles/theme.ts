export type ThemeType = {
  colors: {
    primary: {
      light: string;
      dark: string;
    };
    background: {
      red: string;
    };
  };
  typography: {
    sizes: {
      p: string;
      h6: string;
      h5: string;
      h4: string;
      h3: string;
      h2: string;
      h1: string;
    };
  };
};

const theme: ThemeType = {
  colors: {
    primary: {
      light: '#eee',
      dark: '#292929',
    },
    background: {
      red: '#E25346',
    },
  },
  typography: {
    sizes: {
      p: '1rem',
      h6: '1.125rem',
      h5: '1.25rem',
      h4: '1.375rem',
      h3: '1.5rem',
      h2: '1.75rem',
      h1: '2rem',
    },
  },
};

export default theme;
