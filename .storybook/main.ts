const path = require('path');
const reactRefresh = require('@vitejs/plugin-react-refresh');

module.exports = {
  stories: [
    // "../src/**/*.stories.@(js|jsx|ts|tsx)"
    '../src/components/**/*.stories.@(ts|tsx)',
  ],
  // addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: 'storybook-builder-vite',
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, './src/assets'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, '../src/components'),
      },
    ],
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.resolve.alias.foo = 'bar';

    reactRefresh();

    return config;
  },
};
