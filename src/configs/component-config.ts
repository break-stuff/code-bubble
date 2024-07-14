export type ComponentConfig = {
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
}

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
  reactButtonLabel: 'React'
};
