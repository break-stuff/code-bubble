import type { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import CpCodeBubble from './cp-code-bubble';
import { html } from 'lit';
import { cpCodeBubble } from '../..';

const { events, args, argTypes, template } =
  getWcStorybookHelpers('cp-code-bubble');

cpCodeBubble({
  component: {
    defaultExample: 'react'
  }
});

const meta: Meta<CpCodeBubble> = {
  title: 'Components/CodePen Code Block',
  component: 'cp-code-bubble',
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
type Story = StoryObj<CpCodeBubble & typeof args>;

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

export const CodeBubbleSync: Story = {
  render: () =>
    html`
    <cp-code-bubble>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</cp-code-bubble>
<br>
    <cp-code-bubble>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</cp-code-bubble>
<br>
    <cp-code-bubble>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</cp-code-bubble>
<br>
      `,
  args: {},
};
