import { mergeDeep } from '../utilities/deep-merge';
import { formatCode } from '../utilities/format-code';
import { componentConfig, ComponentConfig } from './component-config';

export type CpSandboxConfig = {
  /** CodePen project configuration for HTML examples */
  html?: ProjectConfig;
  /** CodePen project configuration for React examples */
  react?: ProjectConfig;
};

export type ProjectConfig = {
  /** CodePen project configuration */
  project?: CodePenApiConfig;
  /** Controls how the code is rendered in the example */
  exampleTemplate: ExampleTemplateConfig;
};

export type ExampleTemplateConfig = {
  /** Indicates which code block has the template */
  fileName: 'html' | 'css' | 'js';
  /** Template function that returns the code block with the example in it */
  template: (example: string) => string;
};

export type CodePenApiConfig = {
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

export type CodePenConfig = {
  /** Configuration for the component rendered on the site */
  component?: ComponentConfig;
  /** Configuration for the CodePen sandbox */
  sandbox?: CpSandboxConfig;
};

const options: CpSandboxConfig = {
  html: {
    project: {
      title: 'HTML Example',
      description: 'Example of using the code in HTML.',
      private: false,
      tags: ['html', 'example'],
      editors: '111',
      layout: 'top',
      html: '<div>HTML here.</div>',
      css: `body { 
  font: 16px sans-serif; 
  padding: 1rem; 
}`,
      js: ``,
    },
    exampleTemplate: {
      fileName: 'html',
      template: example => example,
    },
  },
  react: {
    project: {
      title: 'React Example',
      description: 'Example of using the code in React.',
      private: false,
      tags: ['react', 'example'],
      editors: '111',
      layout: 'top',
      html: '<div id="root"></div>',
      css: `body { 
  font: 16px sans-serif; 
  padding: 1rem; 
}`,
      js: `import React from 'react'; 
import ReactDOM from 'react-dom'; 
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));`,
      js_pre_processor: 'babel',
      js_external:
        'https://esm.sh/react@18.2.0;https://esm.sh/react-dom@latest',
    },
    exampleTemplate: {
      fileName: 'js',
      template: example => `import React from 'https://esm.sh/react@latest';
import ReactDOM from 'https://esm.sh/react-dom@latest';

const App = () => (
  <>
${example}
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
`,
    },
  },
};

export let configuration: CodePenConfig = {
  component: componentConfig,
  sandbox: options,
};

export function updateCodePenConfig(userConfig?: CodePenConfig) {
  configuration = mergeDeep(configuration as never, userConfig as never);
}

export async function useCodePenSandbox(example = '', exampleType = 'html') {
  const config = configuration.sandbox![exampleType as keyof CpSandboxConfig];
  if (!config) {
    throw new Error(`Invalid example type: ${exampleType}`);
  }

  const sandboxConfig = {
    ...config.project,
    [config.exampleTemplate.fileName]: await formatCode(
      config.exampleTemplate.template(example),
      exampleType,
    ),
  };

  const form = document.createElement('form');
  form.action = 'https://codepen.io/pen/define';
  form.method = 'POST';
  form.target = '_blank';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'data';
  input.value = JSON.stringify(sandboxConfig);
  form.append(input);

  document.documentElement.append(form);
  form.submit();
  form.remove();
}
