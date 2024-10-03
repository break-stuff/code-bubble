<div align="center">
  <img src="https://github.com/break-stuff/code-bubble/raw/main/img/logo.png?raw=true" alt="code bubble logo" width="200px" style="max-width: 100%;" />
</div>


# Code Bubble

This is a platform agnostic web component designed to showcase code examples and generate sandbox environments in [CodePen](https://codepen.io/) or [StackBlitz](https://stackblitz.com/).

<div align="center">

![code bubble example](https://github.com/break-stuff/code-bubble/blob/main/img/code-bubble.png?raw=true)

![code bubble example with source code open](https://github.com/break-stuff/code-bubble/blob/main/img/code-bubble_open.png?raw=true)

</div>

Features:

- ✅ Global configuration
- ✅ Create multiple instances of the bubble with unique configurations
- ✅ Code preview
- ✅ Supports examples from multiple languages
- ✅ Language code toggle
- ✅ RTL toggle
- ✅ Open in Sandbox (currently supports [CodePen](https://codepen.io/) and [StackBlitz](https://stackblitz.com/))
- ✅ Copy code button
- ✅ Framework example selection sync across instances
- ✅ Persist selected language
- ✅ Custom labels
- ✅ Custom icons
- ✅ Event hooks
- ✅ Preview resize

## Usage

Import the desired sandbox configuration at the root of your project:

```ts
import { CodeBubble, CodeBubbleConfig } from 'code-bubble';

const options: CodeBubbleConfig {
  /* configuration options */
};

new CodeBubble(options);
```

### Use the Components

Once the project is configured, that's it! Start using the components.

If you are using it markdown, be sure to include new lines between the markdown code block.

````html
<code-bubble>

```html
<my-button appearance="accent">Accent</my-button>
``` 

```jsx
<MyButton appearance="accent">Accent</MyButton>
```

</code-bubble>
````

If you are using it HTML, the component will be looking for `<pre>` element with a nested `<code>` element.

Unfortunately, markdown parsers don't follow a consistent pattern for identifying the language for a code block so the componet will look for `class="language-html"` or `data-language="html"` on the parent, `pre`, or `code` elements to help identify which code block it is (for react it would be `class="language-jsx"`/`data-language="jsx"`).

The `<code>` element should contain escaped characters for the tags to properly render the examples.

```html
<code-bubble>
  <pre>
    <code class="language-html">
&lt;my-button appearance=&quot;accent&quot;&gt;Accent&lt;/my-button&gt;
    </code>
  </pre>

  <pre>
    <code class="language-jsx">
&lt;MyButton appearance=&quot;accent&quot;&gt;Accent&lt;/MyButton&gt;
    </code>
  </pre>
</code-bubble>
```

## Configuration

The components are pre-configured and should work without any custom configuration, but if you would like to customize the implementation, each sandbox has it's own options.

```ts
type CodeBubbleConfig = {
  /** Which sandbox environment your code will open in */
  sandbox?: 'codepen' | 'stackblitz';
  /** Configuration for the component rendered on the site */
  component?: ComponentConfig;
  /** Configurations for the sandboxes */
  sandboxConfig?: {
    /** CodePen sandbox configuration */
    codePen: FrameworkConfig<CodePen>;
    /** StackBlitz sandbox configuration */
    stackBlitz: FrameworkConfig<StackBlitz>;
  };
  hooks?: {
    /** Callback function that runs when the code is copied */
    onCopy?: () => void;
    /** Callback function when the RTL button is toggled */
    onRtl?: (isRtl: boolean) => void;
    /** Callback function that runs when a sandbox is opened */
    onSandboxOpen?: () => void;
    /** Callback function that runs when the code section is toggled */
    onShowCode?: (isShowCode: boolean) => void;
    /** Callback function that runs when a language is selected */
    onLanguageChange: (language: string) => void;
  };
};
```

### Component Configuration

The component configuration is the same for each of the sandbox environments. These globally control the component behavior.

```ts
/** Configuration for the component rendered on the site */
type ComponentConfig = {
  /** Code bubble component tag name - must contain a dash, start with a letter and be lower-case */
  tagName?: string;
  /** Opens the "show code" section by default */
  showCode?: boolean;
  /** Indicates which example to show by default */
  defaultExample?: string;
  /** Configuration for the code preview */
  preview: {
    /** Hides the preview window where the code is rendered */
    hide?: boolean;
  };
  /** Configuration for the copy code button */
  copyCodeButton: {
    /** Text displayed in the "copy code" button */
    label?: string;
    /** Text displayed in the "copy code" button when the code has been copied */
    copiedLabel?: string;
    /** Hides the "copy code" button */
    hide?: boolean;
    /** Icon displayed in the "copy code" button - SVG string */
    icon?: string;
    /** Visually hides the label text */
    hideLabel?: boolean;
  };
  /** Configuration for the RTL button */
  rtlButton: {
    /** Text displayed in the "RTL" button */
    label?: string;
    /** Hides the "RTL" button */
    hide?: boolean;
    /** Icon displayed in the "RTL" button - SVG string */
    icon?: string;
    /** Visually hides the label text */
    hideLabel?: boolean;
  };
  /** Configuration for the sandbox button */
  sandboxButton: {
    /** Text displayed in the "sandbox" button */
    label?: string;
    /** Hides the "sandbox" button */
    hide?: boolean;
    /** Icon displayed in the "sandbox" button - SVG string */
    icon?: string;
    /** Visually hides the label text */
    hideLabel?: boolean;
  };
  /** Configuration for the framework toggle buttons */
  frameworkButtons: {
    /** Hides the HTML and React code toggle buttons */
    hide?: boolean;
    /** Text displayed in the framework buttons  */
    label?: (framework: string) => string;
    /** Icon displayed in the framework buttons - SVG string */
    icon?: (framework: string) => string;
    /** Visually hides the label text */
    hideLabel?: boolean;
  };
  /** Configuration for the "show code" toggle button */
  showCodeButton: {
    /** Text displayed when it is collapsed  */
    openLabel?: string;
    /** Text displayed when it is expanded  */
    closeLabel?: string;
    /** Hides the "show code" button */
    hide?: boolean;
    /** Icon displayed in the button - SVG string */
    icon?: string;
    /** Visually hides the label text */
    hideLabel?: boolean;
  };
};
```

#### Defining Framework Labels

When specifying a code block, developers can specify a framework label.

````html

```html
```

```jsx
```

```ruby
```

````

These labels will be used by default for the framework toggle buttons at the bottom of the code bubble. These may not be as useful as you would like them to be for your users (or you may need to provide translations), so you can map new labels for them.

```tsx
new CodeBlock({
  component: {
    frameworkButtonLabel: (framework) => ({
      html: 'HTML',
      jsx: 'React',
      ruby: 'Ruby'
    }[framework] || framework),
  },
});
```

### Sandbox Configuration

Each sandbox supports any framework variation.

```ts
type FrameworkConfig<T extends CodePen | StackBlitz> = {
  /** CodePen project configuration for language examples */
  [key: string]: ProjectConfig<T>;
};

type ProjectConfig<T extends CodePen | StackBlitz> = {
  /** Sandbox API configuration */
  project?: T;
  /** Controls how the code is rendered in the example */
  exampleTemplate: ExampleTemplateConfig;
};

export type ExampleTemplateConfig = {
  /** Indicates which code block has the template */
  // eslint-disable-next-line @typescript-eslint/ban-types
  fileName: 'html' | 'css' | 'js' | (string & {});
  /** Template function that returns the code block with the example in it */
  template: string;
};
```

#### CodePen

```ts
type CodePen = {
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
```

### StackBlitz

```ts
type StackBlitz = {
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
```

### Customizing the Code Example

Each of the project configurations has an `exampleTemplate` property that allows you configure how your example gets rendered. The `fileName` indicates which file or code block them template is in and `template` shows an example of how your example code should be rendered in the template file.

```ts
const config: FrameworkConfig<StackBlitz> = {
  html: {
    exampleTemplate: {
      fileName: 'index.html',
      template: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app">
      %example%
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>`,
    },
  },
};
```

## Creating Different Code Bubble Types

You may need to be able to create code bubbles with different configurations. To do that, you create a new instance of the `CodeBubble` _with a custom tag name_.

```tsx
new CodeBubble({
  /* <code-bubble> - default code bubble config */
});

new CodeBubble({
  /* <ts-bubble> - code bubble config for TypeScript examples */
  component: {
    tagName: 'ts-bubble'
  }
});
```

You will now have an alternative custom element for your TypeScript examples.

````html
<code-bubble>

```html
```

```jsx
```

</code-bubble>
````

````html
<ts-bubble>

```ts
```

```js
```

</ts-bubble>
````

## Globally Setting Framework

If you need to globally set the set the selected framework, the `CodeBubble` instance has a `setLanguage(lang: string)` method that can be used to globally set the components associated to that instance's selected framework. 

```ts
const bubble = new CodeBubble({
  /* code bubble config */
});

bubble.setLanguage('ruby');
```

## Setting Custom Preview

The preview will be generated based on the HTML example provided. If the preview needs to be rendered by a framework or templating language, you can slot in a preview and allow the code to be executed so it can be rendered correctly.

````html
<code-bubble>

<div slot="preview">
  <MyButton>Button Content</MyButton>
</div>

```vue
<MyButton>Button Content</MyButton>
```

</code-bubble>
````

## Hooks

These hooks are designed to allow you to tap into component interactions to create custom behaviors within your application.

```ts
{
  /** Callback function that runs when the code is copied */
  onCopy?: () => void;
  /** Callback function when the RTL button is toggled */
  onRtl?: (isRtl: boolean) => void;
  /** Callback function that runs when a sandbox is opened */
  onSandboxOpen?: (config: ProjectConfig<CodePen | StackBlitz>) => void;
  /** Callback function that runs when the code section is toggled */
  onShowCode?: (isShowCode: boolean) => void;
  /** Callback function that runs when a language is selected */
  onLanguageChange: (language: string) => void;
}
```

### `onCopy`

This is called when the "copy code" button is clicked within the example.

### `onRtl`

This is called when the "RTL" button is toggled, after the `isRtl` value is updated.

### `onSandboxOpen`

This will be called before the standbox is opened and the `config` parameter gives you access to the sandbox configuration so you can update any values to capture any real-time contextual information like the selected theme or light/dark mode settings.

### `onShowCode`

This is called when the example code window is toggled after the `isShowCode` value is updated.

### `onLanguageChange`

This is called when the language example is changed and the `language` value has been updated.

## Component-level Overrides

Code bubble is managed using a global configuration, but there may be times where specific instances need to behave differently. The following attributes can be added to the component to modify the behavior.

| Attribute | Description |
| --------- | ----------- |
| `hide-preview` | Hides the preview display |
| `hide-copy-code` | Hides the copy code button |
| `hide-rtl` | Hides the RTL button |
| `hide-sandbox` | Hides the sandbox button |
| `hide-resize` | Hides the resize button |
| `hide-frameworks` | Hides the framework buttons |
| `hide-show-code` | Hides the show code button |
| `open-show-code` | Opens the show code button |

```html
<code-bubble 
  hide-preview 
  hide-copy-code 
  hide-rtl 
  hide-sandbox
  hide-resize
  hide-frameworks
  hide-show-code
  open-show-code
  >
</code-bubble>
```

## Styling

The following CSS custom properties and parts are available to customize the appearance of the component.

### CSS Custom Properties

| CSS Property                                  | Description                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| --code-bubble-border-color                    | The border color of the component and the controls                     |
| --code-bubble-border-radius                   | The border radius of the component and the controls                    |
| --code-bubble-border-width                    | The border width of the component and the controls                     |
| --code-bubble-preview-padding                 | The padding of the rendered code example                               |
| --code-bubble-snippet-padding                 | The padding for the example code                                       |
| --code-bubble-button-font-weight              | The font weight for the controls                                       |
| --code-bubble-button-icon-gap                 | The gap between the button text and icon                               |
| --code-bubble-button-padding-x                | The horizontal padding for the controls at the bottom of the component |
| --code-bubble-button-padding-y                | The vertical padding for the controls at the bottom of the component   |
| --code-bubble-copy-button-font-weight         | The font weight for the copy code button                               |
| --code-bubble-copy-button-padding-x           | The horizontal padding for the copy button                             |
| --code-bubble-copy-button-padding-y           | The vertical padding for the copy button                               |
| --code-bubble-outline                         | The outline style when elements have keyboard focus                    |
| --code-bubble-outline-offset                  | The offset of the outline when an element has keyboard focus           |
| --code-bubble-button-bg-color                 | The background color of the bottom controls                            |
| --code-bubble-button-border-color             | The border color of the bottom controls                                |
| --code-bubble-button-fg-color                 | The text color of the bottom controls                                  |
| --code-bubble-copy-button-bg-color            | The background color of the copy code button                           |
| --code-bubble-copy-button-border-color        | The border color of the copy code button                               |
| --code-bubble-copy-button-fg-color            | The text color of the copy code button                                 |
| --code-bubble-button-hover-bg-color           | The background color of the bottom controls on hover                   |
| --code-bubble-button-hover-border-color       | The border color of the bottom controls on hover                       |
| --code-bubble-button-hover-fg-color           | The text color of the bottom controls on hover                         |
| --code-bubble-copy-button-hover-bg-color      | The background color of the copy code button on hover                  |
| --code-bubble-copy-button-hover-border-color  | The border color of the copy code button on hover                      |
| --code-bubble-copy-button-hover-fg-color      | The text color of the copy code button on hover                        |
| --code-bubble-button-focus-bg-color           | The background color of the bottom controls on focus                   |
| --code-bubble-button-focus-border-color       | The border color of the bottom controls on hover                       |
| --code-bubble-button-focus-fg-color           | The text color of the bottom controls on hover                         |
| --code-bubble-copy-button-focus-bg-color      | The background color of the copy code button on focus                  |
| --code-bubble-copy-button-focus-border-color  | The border color of the copy code button on focus                      |
| --code-bubble-copy-button-focus-fg-color      | The text color of the copy code button on focus                        |
| --code-bubble-button-active-bg-color          | The background color of the bottom controls on active                  |
| --code-bubble-button-active-border-color      | The border color of the bottom controls on active                      |
| --code-bubble-button-active-fg-color          | The text color of the bottom controls on active                        |
| --code-bubble-button-active-font-weight       | The font weight of the bottom controls on active                       |
| --code-bubble-copy-button-active-bg-color     | The background color of the copy code button on active                 |
| --code-bubble-copy-button-active-border-color | The border color of the copy code button on active                     |
| --code-bubble-copy-button-active-fg-color     | The text color of the copy code button on active                       |

### CSS Parts

| CSS Part                | Description                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| code-bubble-base        | The base wrapper for the internal component                        |
| code-bubble-preview     | The element that wraps the rendered example                        |
| code-bubble-code        | The element that wraps the source code section                     |
| code-bubble-copy-button | The button used to copy code to the clipboard                      |
| code-bubble-controls    | The element that wraps the controls at the bottom of the component |
| code-bubble-control     | The buttons at the bottom of the component                         |
| code-bubble-show-source | The "show source" button                                           |
| code-bubble-framework   | The framework toggle buttons                                       |
| code-bubble-rtl         | The "RTL" button                                                   |
