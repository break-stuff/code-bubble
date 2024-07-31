export type CodeBubbleConfig = {
  /** Which sandbox environment your code will open in */
  sandbox?: 'codepen' | 'stackblitz';
  /** Configuration for the component rendered on the site */
  component?: ComponentConfig;
  /** Configurations for the sandboxes */
  sandboxConfig?: {
    /** CodePen sandbox configuration */
    codePen?: FrameworkConfig<CodePen>;
    /** StackBlitz sandbox configuration */
    stackBlitz?: FrameworkConfig<StackBlitz>;
  };
};

export type ComponentConfig = {
  /** Code bubble component tag name - must contain a dash, start with a letter and be lower-case */
  tagName?: string;
  /** Opens the "show code" section by default */
  openShowCode?: boolean;
  /** Indicates which example to show by default */
  defaultExample?: 'html' | 'react';
  /** Hides the "copy code" button */
  hideCopyCodeButton?: boolean;
  /** Hides the "RTL" button */
  hideRtlButton?: boolean;
  /** Hides the "sandbox" button */
  hideSandboxButton?: boolean;
  /** Hides the "show code" button */
  hideShowCodeButton?: boolean;
  /** Hides the HTMl and React code toggle buttons */
  hideFrameworkButtons?: boolean;
  /** Hides the preview window where the code is rendered */
  hidePreview?: boolean;
  /** Text displayed in the "show code" button  */
  showCodeButtonLabel?: string;
  /** Text displayed in the "copy code" button  */
  copyCodeButtonLabel?: string;
  /** Text displayed in the "copy code" button when text has been copied  */
  copyCodeButtonCopiedLabel?: string;
  /** Text displayed in the "RTL" button  */
  rtlButtonLabel?: string;
  /** Text displayed in the "sandbox" button  */
  sandboxButtonLabel?: string;
  /** Text displayed in the "HTML" button  */
  htmlButtonLabel?: string;
  /** Text displayed in the "React" button  */
  reactButtonLabel?: string;
};

export type FrameworkConfig<T extends CodePen | StackBlitz> = {
  /** CodePen project configuration for HTML examples */
  html?: ProjectConfig<T>;
  /** CodePen project configuration for React examples */
  react?: ProjectConfig<T>;
};

export type ProjectConfig<T extends CodePen | StackBlitz> = {
  /** Sandbox API configuration */
  project?: T;
  /** Controls how the code is rendered in the example */
  exampleTemplate?: ExampleTemplateConfig;
};

export type ExampleTemplateConfig = {
  /** Indicates which code block has the template */
  // eslint-disable-next-line @typescript-eslint/ban-types
  fileName: 'html' | 'css' | 'js' | (string & {});
  /** Template function that returns the code block with the example in it */
  template: string;
};

export type CodePen = {
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

export type StackBlitz = {
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
