import type { Meta, StoryObj } from '@storybook/web-components';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { html } from 'lit';
import { CodeBlock, ProjectConfig, StackBlitz } from '../../configs/index.js';
import CodeBubble from './code-bubble.js';

const { events, args, argTypes, template } =
  getWcStorybookHelpers('code-bubble');

let selectedLang = 'html';

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

new CodeBlock({
  sandbox: 'codepen',
  component: {
    tagName: 'test-bubble',
  },
});

new CodeBlock({
  sandbox: 'stackblitz',
  component: {
    tagName: 'theme-bubble',
  },
  hooks: {
    onLanguageChange(language) {
      selectedLang = language;
    },
    onSandboxOpen(config: ProjectConfig<StackBlitz>) {
      const theme = 'light-theme';
      if (selectedLang === 'html') {
        config.exampleTemplate = {
          fileName: 'index.html',
          template: `<!doctype html>
<html lang="en" class="${theme}">
<head>
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Vite App</title>
</head>
<body>
<div id="app">
<button appearance="accent">Accent</button>
<button appearance="neutral">Neutral</button>
<button appearance="lightweight">Lightweight</button>

</div>
<script type="module" src="/main.js"></script>
</body>
</html>`,
        };
      } else {
        config.project!.files!['index.html'] = `<!DOCTYPE html>
<html class="${theme}">
<head>
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>React code example</title>
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/index.tsx"></script>
</body>
</html>`;
      }
    },
  },
});

const meta: Meta<CodeBubble> = {
  title: 'Components/Code Block',
  component: 'code-bubble',
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
type Story = StoryObj<CodeBubble & typeof args>;

export const Default: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">export default () =&gt; {
  return (
    &lt;&gt;
      &lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
      &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
      &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    &lt;/&gt;
  );
};
</code></pre>
      `,
    )}
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
      magna non neque elementum dignissim. Sed dictum enim a quam eleifend
      eleifend. Sed blandit felis vel ipsum efficitur, eu placerat ligula
      convallis. Nam dictum accumsan libero. Cras eu viverra metus. Pellentesque
      ornare massa ex, ut mattis velit rutrum sed. Sed id lectus in purus
      suscipit convallis eu vehicula leo. Nullam quis iaculis magna.
    </p>
  `,
  args: {},
};

export const Overflow: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code class="language-html">&lt;button style=&quot;width:500px&quot; appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
      `,
    )}
  `,
  args: {},
};

export const ComponentSync: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">export default () =&gt; {
  return (
    &lt;&gt;
      &lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
      &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
      &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    &lt;/&gt;
    );
};
</code></pre>
      `,
    )}
    <br />
    ${template(
      args,
      html`
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">export default () =&gt; {
  return (
    &lt;&gt;
      &lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
      &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
      &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    &lt;/&gt;
    );
};
</code></pre>
      `,
    )}
    <br />
    ${template(
      args,
      html`
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">export default () =&gt; {
  return (
    &lt;&gt;
      &lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
      &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
      &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    &lt;/&gt;
    );
};
</code></pre>
      `,
    )}
    <br />
  `,
  args: {},
};

export const SingleFramework: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
      `,
    )}
    <br />
    ${template(
      args,
      html`
        <pre><code class="language-jsx">export default () =&gt; {
  return (
    &lt;&gt;
      &lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
      &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
      &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    &lt;/&gt;
    );
};
</code></pre>
      `,
    )}
  `,
  args: {},
};

export const NoFramework: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code>&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
      `,
    )}
  `,
  args: {},
};

export const ExecuteJS: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code>&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;

&lt;script&gt;
  const test = 'test 1';
  console.log(test);
  alert('Hello, World!');
&lt;/script&gt;
</code></pre>
      `,
    )}
  `,
  args: {},
};

// This tests to ensure that variables in the scripts are scoped to the example
export const ScopeJS: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code>&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;

&lt;script&gt;
  const test = 'test 1';
  console.log(test);
&lt;/script&gt;
</code></pre>
      `,
    )}
    <br />
    ${template(
      args,
      html`
        <pre><code>&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;

&lt;script&gt;
  const test = 'test 2';
  console.log(test);
&lt;/script&gt;
</code></pre>
      `,
    )}
  `,
  args: {},
};

export const CustomTagName: Story = {
  render: () => html`
    <test-bubble>
      <pre><code>&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
    </test-bubble>
  `,
  args: {},
};

export const PrismJS: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><div class="docblock-source sb-unstyled css-12u9f4"><div dir="ltr" scrollbarsize="6" offset="2" class="css-1dnv2kn" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" class="css-uwwqev" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs css-4zr3vl"><div class="language-html css-1lwmlsb" style="white-space: pre;"><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Header 1</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">div</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Panel 1</span><span class="token tag punctuation">&lt;/</span><span class="token tag">div</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Header 2</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">div</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Panel 2</span><span class="token tag punctuation">&lt;/</span><span class="token tag">div</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Header 3</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">div</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Panel 3</span><span class="token tag punctuation">&lt;/</span><span class="token tag">div</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class=""></span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion</span><span class="token tag punctuation">&gt;</span></div></pre></div></div></div><div class="css-11xgcgt"><button class="css-1fdphfk">Copy</button></div></div></pre>
      `,
    )}
  `,
  args: {},
};

export const ThemeExample: Story = {
  render: () => {
    return html`
      <theme-bubble>
        <pre><code>&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
      </theme-bubble>
    `;
  },
  args: {},
};

export const StorybookDocBlock: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><div class="docblock-source sb-unstyled css-12u9f4"><div dir="ltr" scrollbarsize="6" offset="2" class="css-1dnv2kn" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" class="css-uwwqev" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs css-4zr3vl" slot="html"><div class="language-html css-zye6j" style="white-space: pre;"><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Header 1</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="">
</span>    Accordion Panel 1
<span class="">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Header 2</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="">
</span>    Accordion Panel 2
<span class="">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token tag punctuation">&lt;</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="">Accordion Header 3</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="">
</span>    Accordion Panel 3
<span class="">  </span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion-item</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class=""></span><span class="token tag punctuation">&lt;/</span><span class="token tag">my-accordion</span><span class="token tag punctuation">&gt;</span></div></pre></div></div></div><div class="css-11xgcgt"><button class="css-1fdphfk">Copy</button></div></div></pre>
        <pre><div class="docblock-source sb-unstyled css-12u9f4"><div dir="ltr" scrollbarsize="6" offset="2" class="css-1dnv2kn" style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"><style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style><div data-radix-scroll-area-viewport="" class="css-uwwqev" style="overflow: scroll;"><div style="min-width: 100%; display: table;"><pre class="prismjs css-4zr3vl" slot="jsx"><div class="language-jsx css-zye6j" style="white-space: pre;"><span class="token keyword module">import</span><span class=""> </span><span class="token imports punctuation">{</span><span class="token imports"> </span><span class="token imports maybe-class-name">FluentAccordion</span><span class="token imports punctuation">,</span><span class="token imports"> </span><span class="token imports maybe-class-name">FluentAccordionItem</span><span class="token imports"> </span><span class="token imports punctuation">}</span><span class=""> </span><span class="token keyword module">from</span><span class=""> </span><span class="token string">'@library/components/react'</span><span class="token punctuation">;</span><span class="">
</span>
<span class=""></span><span class="token keyword module">export</span><span class=""> </span><span class="token keyword module">default</span><span class=""> </span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class=""> </span><span class="token arrow operator">=&gt;</span><span class=""> </span><span class="token punctuation">{</span><span class="">
</span><span class="">  </span><span class="token keyword control-flow">return</span><span class=""> </span><span class="token punctuation">(</span><span class="">
</span><span class="">    </span><span class="token tag punctuation">&lt;</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">      </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">FluentAccordion</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">        </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">FluentAccordionItem</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">          </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">Accordion Header 1</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">          Accordion Panel 1
</span><span class="token plain-text">        </span><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">FluentAccordionItem</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">        </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">FluentAccordionItem</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">          </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">Accordion Header 2</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">          Accordion Panel 2
</span><span class="token plain-text">        </span><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">FluentAccordionItem</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">        </span><span class="token tag punctuation">&lt;</span><span class="token tag class-name">FluentAccordionItem</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">          </span><span class="token tag punctuation">&lt;</span><span class="token tag">span</span><span class="token tag"> </span><span class="token tag attr-name">slot</span><span class="token tag attr-value punctuation attr-equals">=</span><span class="token tag attr-value punctuation">"</span><span class="token tag attr-value">heading</span><span class="token tag attr-value punctuation">"</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">Accordion Header 3</span><span class="token tag punctuation">&lt;/</span><span class="token tag">span</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">          Accordion Panel 3
</span><span class="token plain-text">        </span><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">FluentAccordionItem</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">      </span><span class="token tag punctuation">&lt;/</span><span class="token tag class-name">FluentAccordion</span><span class="token tag punctuation">&gt;</span><span class="token plain-text">
</span><span class="token plain-text">    </span><span class="token tag punctuation">&lt;/</span><span class="token tag punctuation">&gt;</span><span class="">
</span><span class="">  </span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="">
</span><span class=""></span><span class="token punctuation">}</span><span class="token punctuation">;</span></div></pre></div></div></div><div class="css-11xgcgt"><button class="css-1fdphfk">Copy</button></div></div></pre>
      `,
    )}
  `,
  args: {},
};

export const Hooks: Story = {
  render: () => {
    return html`
      <theme-bubble>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
        <pre><code class="language-jsx">export default () =&gt; {
  return (
    &lt;&gt;
      &lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
      &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
      &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    &lt;/&gt;
  );
};
</code></pre>
      </theme-bubble>
    `;
  },
  args: {},
};

export const CustomPreview: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <div slot="preview">
          This is some custom preview content
        </div>
        <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
      `,
    )}
  `,
  args: {},
};

export const OverflowContent: Story = {
  render: args => html`
    ${template(
      args,
      html`
        <pre><code class="language-html">&lt;sl-select&gt;
  &lt;sl-option value=&quot;option-1&quot;&gt;Option 1&lt;/sl-option&gt;
  &lt;sl-option value=&quot;option-2&quot;&gt;Option 2&lt;/sl-option&gt;
  &lt;sl-option value=&quot;option-3&quot;&gt;Option 3&lt;/sl-option&gt;
  &lt;sl-option value=&quot;option-4&quot;&gt;Option 4&lt;/sl-option&gt;
  &lt;sl-option value=&quot;option-5&quot;&gt;Option 5&lt;/sl-option&gt;
  &lt;sl-option value=&quot;option-6&quot;&gt;Option 6&lt;/sl-option&gt;
&lt;/sl-select&gt;
</code></pre>
      `,
    )}
  `,
  args: {},
};
