# Code Bubble

This is a platform agnostic web component designed to showcase code examples and generate sandbox environments in [CodePen](https://codepen.io/) or [StackBlitz](https://stackblitz.com/).

![code bubble example](https://github.com/break-stuff/code-blox/blob/main/img/code-bubble.png?raw=true)

![code bubble example with source code open](https://github.com/break-stuff/code-blox/blob/main/img/code-bubble_open.png?raw=true)

Features:

- ✅ Global configuration
- ✅ Code preview
- ✅ Multiple framework (currently HTML and React examples)
- ✅ Example code toggle
- ✅ RTL toggle
- ✅ Open in Sandbox (currently supports [CodePen](https://codepen.io/) and [StackBlitz](https://stackblitz.com/))
- ✅ Copy code button
- ✅ Framework example selection sync across instances 
- ✅ Persist selected option
- ❌ Preview resize (coming soon)

## Usage

Import the desired sandbox configuration at the root of your project:

```ts
// CodePen sandbox
import { cpCodeBubble, CodePenConfig } from 'code-bubble';

const options: CodePenConfig {
  /* configuration options */
};

cpCodeBubble(options);
```

```ts
// StackBlitz sandbox
import { sbCodeBubble, StackBlitzConfig } from 'code-bubble';

const options: StackBlitzConfig {
  /* configuration options */
};

sbCodeBubble(options);
```

### Use the Components

Once the project is configured, that's it! Start using the components.

If you are using it markdown, be sure to include new lines between the markdown code block.

````html
<!-- CodePen Example -->
<cp-code-bubble>

```html
<my-button appearance="accent">Accent</my-button>
```

```jsx
<MyButton appearance="accent">Accent</MyButton>
```

</cp-code-bubble>

<!-- StackBlitz Example -->
<sb-code-bubble>

```html
<my-button appearance="accent">Accent</my-button>
```

```jsx
<MyButton appearance="accent">Accent</MyButton>
```

</sb-code-bubble>
````

If you are using it HTML, the component will be looking for `<pre>` element with a nested `<code>` element. 

Unfortunately, markdown parsers don't follow a consistent pattern for identifying the language for a code block so the componet will look for `class="language-html"` or `data-language="html"` on the parent, `pre`, or `code` elements to help identify which code block it is (for react it would be `class="language-jsx"`/`data-language="jsx"`). 

The `<code>` element should contain escaped characters for the tags to properly render the examples.

```html
<!-- CodePen Example -->
<cp-code-bubble>
<pre><code class="language-html">
&lt;my-button appearance=&quot;accent&quot;&gt;Accent&lt;/my-button&gt;
</code></pre>

<pre><code class="language-jsx">
&lt;MyButton appearance=&quot;accent&quot;&gt;Accent&lt;/MyButton&gt;
</code></pre>
</cp-code-bubble>

<!-- StackBlitz Example -->
<sb-code-bubble>
<pre><code class="language-html">
&lt;my-button appearance=&quot;accent&quot;&gt;Accent&lt;/my-button&gt;
</code></pre>

<pre><code class="language-jsx">
&lt;MyButton appearance=&quot;accent&quot;&gt;Accent&lt;/MyButton&gt;
</code></pre>
</sb-code-bubble>
```
