import type { Preview } from '@storybook/web-components';
import { setCustomElementsManifest } from "@storybook/web-components";
import customElements from "../custom-elements.json";
import { setWcStorybookHelpersConfig } from "wc-storybook-helpers";
import { withActions } from '@storybook/addon-actions/decorator';
import { CodeBlock } from '../src/configs';

setWcStorybookHelpersConfig({ typeRef: 'expandedType' });
setCustomElementsManifest(customElements);

new CodeBlock({
  sandbox: 'stackblitz',
  component: {
    frameworkButtons: {
      label: framework =>
        ({
          html: 'HTML',
          jsx: 'React',
        })[framework] || framework,
    },
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      sort: 'alpha',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withActions],
};

export default preview;
