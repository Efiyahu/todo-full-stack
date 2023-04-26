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
      dark: string;
      darkBlue: string;
      lightBlue: string;
      gray: string;
    };
    button: ButtonType;
  };
  priority: {
    Low: string;
    Medium: string;
    High: string;
  };
};

const theme: ThemeType = {
  colors: {
    primary: {
      light: '#eee',
      default: '#F15A59',
      dark: '#131517',
      darkBlue: '#1E1F25',
      lightBlue: '#5051F9',
      gray: '#768396',
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
  priority: {
    High: '#F15A59',
    Medium: '#FC9858',
    Low: '#2CDE9A',
  },
};

export default theme;
