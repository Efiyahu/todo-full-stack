import React from 'react';
import StylesProvider from '../src/styles/Provider';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    Story => (
      <StylesProvider>
        <Story />
      </StylesProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
