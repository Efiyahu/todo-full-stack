type ButtonType = {
  default: string;
  hover: string;
  active: string;
  disabled: string;
  opacity: string;
  text: string;
};

export type ThemeType = {
  colors: {
    primary: {
      light: string;
      default: string;
    };
    button: ButtonType;
  };
};

const theme: ThemeType = {
  colors: {
    primary: {
      light: '#eee',
      default: '#F15A59',
    },
    button: {
      default: '#F15A59',
      hover: '#ED2B2A',
      active: '#D21312',
      disabled: '#D8D8D8',
      opacity: 'rgba(241,90,89,.3)',
      text: '#eee',
    },
  },
};

export default theme;
