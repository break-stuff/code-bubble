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
  ``` ```jsx
  <MyButton appearance="accent">Accent</MyButton>
  ```
</cp-code-bubble>

<!-- StackBlitz Example -->
<sb-code-bubble>
  ```html
  <my-button appearance="accent">Accent</my-button>
  ``` ```jsx
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

## Configuration

The components are pre-configured and should work without any custom configuration, but if you would like to customize the implementation, each sandbox has it's own options.

```ts
type CodePenConfig = {
  component?: ComponentConfig;
  sandbox?: CpSandboxConfig;
};
```

```ts
type StackBlitzConfig = {
  component?: ComponentConfig;
  sandbox?: StackBlitzProjectConfig;
};
```

### Component Configuration

The component configuration is the same for each of the sandbox environments. These globally control the component behavior.

```ts
type ComponentConfig = {
  /** Opens the "show code" section by default */
  openShowCode?: boolean;
  /** Hides the "show code" button */
  hideShowCodeButton?: boolean;
  /** Text displayed in the "show code" button  */
  showCodeButtonLabel?: string;
  /** Hides the "copy code" button */
  hideCopyCodeButton?: boolean;
  /** Text displayed in the "copy code" button  */
  copyCodeButtonLabel?: string;
  /** Text displayed in the "copy code" button when text has been copied  */
  copyCodeButtonCopiedLabel?: string;
  /** Indicates which example to show by default */
  defaultExample?: 'html' | 'react';
  /** Hides the "RTL" button */
  hideRtlButton?: boolean;
  /** Text displayed in the "RTL" button  */
  rtlButtonLabel?: string;
  /** Hides the "sandbox" button */
  hideSandboxButton?: boolean;
  /** Text displayed in the "sandbox" button  */
  sandboxButtonLabel?: string;
  /** Text displayed in the "HTML" button  */
  htmlButtonLabel?: string;
  /** Text displayed in the "React" button  */
  reactButtonLabel?: string;
};
```

### CodePen

```ts
type CpSandboxConfig = {
  /** CodePen project configuration for HTML examples */
  html?: ProjectConfig;
  /** CodePen project configuration for React examples */
  react?: ProjectConfig;
};

type ProjectConfig = {
  /** CodePen project configuration */
  project?: CodePenApiConfig;
  /** Controls how the code is rendered in the example */
  exampleTemplate: ExampleTemplateConfig;
};

type CodePenApiConfig = {
  /** Pen title */
  title?: string;
  /** Pen description */
  description?: string;
  /** When the Pen is saved, it will save as Private if logged in user has that privledge, otherwise it will save as public */
  private?: boolean;
  /** If supplied, the Pen will save as a fork of this id. Note it's not the slug, but ID. You can find the ID of a Pen with `window.CP.pen.id` in the browser console. */
  parent?: string;
  /** Words to help identify and categorize the sandbox */
  tags?: string[];
  /** Set which editors are open. "1" is open and "0" is collapsed. The order is "HTML", "CSS", and "JS" */
  editors?: '001' | '010' | '100' | '011' | '101' | '110' | '111';
  /** Determines the position of the code */
  layout?: 'top' | 'left' | 'right';
  /** Content in the HTML panel */
  html?: string;
  /** Specifies an alternative markup syntax  */
  html_pre_processor?: 'none' | 'slim' | 'haml' | 'markdown';
  /** Content in the HTML panel */
  css?: string;
  /** Specifies an alternative style syntax */
  css_pre_processor?: 'none' | 'less' | 'scss' | 'sass' | 'stylus';
  /** Adds a CSS reset or normalizer to your pen */
  css_starter?: 'normalize' | 'reset' | 'neither';
  /** Adds vendor prefixes to your CSS */
  css_prefix?: 'autoprefixer' | 'prefixfree' | 'neither';
  /** Content in the HTML panel */
  js?: string;
  /** Specifies an alternative script syntax */
  js_pre_processor?:
    | 'none'
    | 'coffeescript'
    | 'babel'
    | 'livescript'
    | 'typescript';
  /** Class names applied to the `<html>` element */
  html_classes?: string;
  /** Content for the `<head>` tag */
  head?: string;
  /** Semi-colon separate list of CDN urls to include in the pen */
  css_external?: string;
  /** Semi-colon separate list of CDN urls to include in the pen */
  js_external?: string;
};

type ExampleTemplateConfig = {
  /** Indicates which code block has the template */
  fileName: 'html' | 'css' | 'js';
  /** Template function that returns the code block with the example in it */
  template: (example: string) => string;
};
```

### StackBlitz

```ts
type SbProjectConfig = {
  html?: ProjectConfig;
  react?: ProjectConfig;
};

type ProjectConfig = {
  project?: SbApiConfig;
  exampleTemplate: ExampleTemplateConfig;
};

type SbApiConfig = {
  title?: string;
  description?: string;
  /**
   * Provide project files, as code strings.
   *
   * Binary files and blobs are not supported.
   */
  files?: {
    [name: string]: string;
  };
};

type ExampleTemplateConfig = {
  /** Indicates which file has the template */
  fileName: string;
  /** Template function that returns the file contents with the example in it */
  template: (example: string) => string;
};
```

### Customizing the Code Example

Each of the project configurations has a `exampleTemplate` property that allows you configure how your example gets rendered. The `fileName` indicates which file or code block them template is in and `template` shows an example of how your example code should be rendered in the template file.

```ts
const config: SbProjectConfig = {
  html: {
    exampleTemplate: {
      fileName: 'index.html',
      template: (example: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app">
      ${example}
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>`,
    },
  },
};
```
