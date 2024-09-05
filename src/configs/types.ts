/** Global configuration for a code bubble instance */
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
  /** Callback functions for the code bubble component */
  hooks?: {
    /** Callback function that runs when the code is copied */
    onCopy?: () => void;
    /** Callback function when the RTL button is toggled */
    onRtl?: (isRtl: boolean) => void;
    /** Callback function that runs when a sandbox is opened */
    onSandboxOpen?: (config: ProjectConfig<CodePen | StackBlitz>) => void;
    /** Callback function that runs when the code is shown */
    onShowCode?: (isShowCode: boolean) => void;
    /** Callback function that runs when a language is selected */
    onLanguageChange?: (language: string) => void;
  };
};

/** Configuration for the component rendered on the site */
export type ComponentConfig = {
  /** Code bubble component tag name - must contain a dash, start with a letter and be lower-case */
  tagName?: string;
  /** Opens the "show code" section by default */
  openShowCode?: boolean;
  /** Indicates which example to show by default */
  defaultExample?: string;
  /** Configuration for the code preview */
  preview?: {
    /** Hides the preview window where the code is rendered */
    hide?: boolean;
  };
  /** Configuration for the copy code button */
  copyCodeButton?: {
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
  rtlButton?: {
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
  sandboxButton?: {
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
  frameworkButtons?: {
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
  showCodeButton?: {
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

/** Configuration for the sandbox environments using the language tag as the key (`html`, `jsx`, `ts`, etc.) */
export type FrameworkConfig<T extends CodePen | StackBlitz> = {
  /** CodePen project configuration for language examples */
  [key: string]: ProjectConfig<T>;
};

/** Configuration for the sandbox project */
export type ProjectConfig<T extends CodePen | StackBlitz> = {
  /** Sandbox API configuration */
  project?: T;
  /** Controls how the code is rendered in the example */
  exampleTemplate?: ExampleTemplateConfig;
};

/** Configuration for the code block that's rendered in the sandbox environment */
export type ExampleTemplateConfig = {
  /** Indicates which code block has the template */
  // eslint-disable-next-line @typescript-eslint/ban-types
  fileName: 'html' | 'css' | 'js' | (string & {});
  /** Template function that returns the code block with the example in it */
  template: string;
};

/** CodePen project configuration */
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

/** StackBlitz project configuration */
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
