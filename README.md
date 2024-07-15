# Code Block

This component is designed to showcase code examples where there may be variations in code examples for things like web components.

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
import { cpCodeBlock, CodePenConfig } from 'code-block';

const options: CodePenConfig {
  /* configuration options */
};

cpCodeBlock(options);
```

```ts
// StackBlitz sandbox
import { sbCodeBlock, StackBlitzConfig } from 'code-block';

const options: StackBlitzConfig {
  /* configuration options */
};

sbCodeBlock(options);
```

### Use the Components

Once the project is configured, that's it! Start using the components.

If you are using it HTML, the component will be looking for `<pre>` element with a nested `<code class="language-html">` (or `class="language-jsx"`) and escaped characters for the tags to properly render the examples.

```html
<!-- CodePen Example -->
<cp-code-block>
<pre><code class="language-html">
&lt;my-button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>

<pre><code class="language-jsx">
&lt;Button appearance=&quot;accent&quot;&gt;Accent&lt;/Button&gt;
&lt;Button appearance=&quot;neutral&quot;&gt;Neutral&lt;/Button&gt;
&lt;Button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/Button&gt;
</code></pre>
</cp-code-block>

<!-- StackBlitz Example -->
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
```

If you are using it markdown, be sure to include new lines between the open and 