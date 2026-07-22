import '@wordpress/components/build-style/style.css';
import '../src/scss/index.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'admin',
      values: [
        { name: 'admin', value: '#f7f8fa' },
        { name: 'card', value: '#ffffff' },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
};

export default preview;
