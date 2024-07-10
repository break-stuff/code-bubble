import type { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import CodeBlock from './code-block';
import { html } from 'lit';

const { events, args, argTypes, template } = getWcStorybookHelpers(
  'stack-blitz-code-block',
);

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
  render: args =>
    template(
      args,
      html`
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">import { badge } from '@harmony/enablers/react';

const Badge = scope.forReact(badge);

export default () =&gt; {
  return (
    &lt;&gt;
      &lt;Badge appearance=&quot;accent&quot;&gt;Accent&lt;/Badge&gt;
      &lt;Badge appearance=&quot;neutral&quot;&gt;Neutral&lt;/Badge&gt;
      &lt;Badge appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Badge&gt;
    &lt;/&gt;
  );
};
</code></pre>
      `,
    ),
  args: {},
};
