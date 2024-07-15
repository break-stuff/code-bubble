import type { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import SbCodeBlock from './sb-code-block';
import { html } from 'lit';
import { sbCodeBloc } from '../..';

const { events, args, argTypes, template } = getWcStorybookHelpers(
  'sb-code-block',
);

// customElements.define('sb-code-block', SbCodeBlock);
sbCodeBloc({
  component: {
  }
});

const meta: Meta<SbCodeBlock> = {
  title: 'Components/StackBlitz Code Block',
  component: 'sb-code-block',
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
type Story = StoryObj<SbCodeBlock & typeof args>;

export const Default: Story = {
  render: args =>
    template(
      args,
      html`
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
      `,
    ),
  args: {},
};


export const CodeBlockSync: Story = {
  render: () =>
    html`
    <sb-code-block>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</sb-code-block>
<br>
    <sb-code-block>
        <pre><code class="language-html">
&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">
&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</sb-code-block>
<br>
    <sb-code-block>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</sb-code-block>
<br>
      `,
  args: {},
};
