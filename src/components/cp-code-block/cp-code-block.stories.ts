import type { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import CpCodeBlock from './cp-code-block';
import { html } from 'lit';
import { cpCodeBlock } from '../..';

const { events, args, argTypes, template } =
  getWcStorybookHelpers('cp-code-block');

cpCodeBlock({
  component: {
    defaultExample: 'react'
  }
});

const meta: Meta<CpCodeBlock> = {
  title: 'Components/CodePen Code Block',
  component: 'cp-code-block',
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
type Story = StoryObj<CpCodeBlock & typeof args>;

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
    <cp-code-block>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</cp-code-block>
<br>
    <cp-code-block>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</cp-code-block>
<br>
    <cp-code-block>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</cp-code-block>
<br>
      `,
  args: {},
};
