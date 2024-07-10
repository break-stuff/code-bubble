import type { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from "wc-storybook-helpers";
import CodeBlock from './code-block';

const { events, args, argTypes, template } =
  getWcStorybookHelpers('stack-blitz-code-block');

customElements.define('stack-blitz-code-block', CodeBlock);

const meta: Meta<CodeBlock> = {
  title: 'Components/Code Block',
  component: 'stack-blitz-code-block',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

/**
 * create Story type that will provide autocomplete and docs for `args`,
 * but also allow for namespaced args like CSS Shadow Parts and Slots
 */
type Story = StoryObj<CodeBlock & typeof args>;

export const Default: Story = {
  render: (args) => template(args),
  args: {},
};
