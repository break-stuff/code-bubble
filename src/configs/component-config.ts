export type ComponentConfig = {
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

export const componentConfig: ComponentConfig = {
  openShowCode: false,
  hideShowCodeButton: false,
  showCodeButtonLabel: 'Show Code',
  hideCopyCodeButton: false,
  copyCodeButtonLabel: 'Copy',
  copyCodeButtonCopiedLabel: 'Copied',
  defaultExample: 'html',
  hideRtlButton: false,
  rtlButtonLabel: 'RTL',
  hideSandboxButton: false,
  sandboxButtonLabel: 'Sandbox',
  htmlButtonLabel: 'HTML',
  reactButtonLabel: 'React',
};
