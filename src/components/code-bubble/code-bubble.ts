import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from './code-bubble.styles.js';
import { ComponentConfig } from '../../configs/component-config.js';
import {
  configuration,
  useCodePenSandbox,
  useStackBlitzSandbox,
} from '../../configs/sandbox-configs.js';

export type CodeExamples = 'html' | 'react';

/**
 * This component is designed for displaying code examples in a visually appealing and interactive manner.
 *
 * @tag code-bubble
 *
 * @cssprop [--code-bubble-border-color=rgb(228, 228, 231)] The border color of the component and the controls
 * @cssprop [--code-bubble-border-radius=4px] The border radius of the component and the controls
 * @cssprop [--code-bubble-border-width=1px] The border width of the component and the controls
 * @cssprop [--code-bubble-preview-padding=1.5rem] The padding of the rendered code example
 * @cssprop [--code-bubble-snippet-padding=1.5rem] The padding for the example code
 * @cssprop [--code-bubble-button-font-weight=inherit] The font weight for the controls
 * @cssprop [--code-bubble-button-icon-gap=0.5rem] The gap between the button text and icon
 * @cssprop [--code-bubble-button-padding-x=1rem] The horizontal padding for the controls at the bottom of the component
 * @cssprop [--code-bubble-button-padding-y=1rem] The vertical padding for the controls at the bottom of the component
 * @cssprop [--code-bubble-copy-button-font-weight=inherit] The font weight for the copy code button
 * @cssprop [--code-bubble-copy-button-padding-x=0.5rem] The horizontal padding for the copy button
 * @cssprop [--code-bubble-copy-button-padding-y=0.5rem] The vertical padding for the copy button
 * @cssprop [--code-bubble-outline=solid 2px rgb(0, 95, 204)] The outline style when elements have keyboard focus
 * @cssprop [--code-bubble-outline-offset=0] The offset of the outline when an element has keyboard focus
 * @cssprop [--code-bubble-button-bg-color=inherit] The background color of the bottom controls
 * @cssprop [--code-bubble-button-border-color=var([--code-bubble-border-color)] The border color of the bottom controls
 * @cssprop [--code-bubble-button-fg-color=inherit] The text color of the bottom controls
 * @cssprop [--code-bubble-copy-button-bg-color=inherit] The background color of the copy code button
 * @cssprop [--code-bubble-copy-button-border-color=var([--code-bubble-border-color)] The border color of the copy code button
 * @cssprop [--code-bubble-copy-button-fg-color=inherit] The text color of the copy code button
 * @cssprop [--code-bubble-button-hover-bg-color=rgb(237 237 237)] The background color of the bottom controls on hover
 * @cssprop [--code-bubble-button-hover-border-color=rgb(135 135 135)] The border color of the bottom controls on hover
 * @cssprop [--code-bubble-button-hover-fg-color=inherit] The text color of the bottom controls on hover
 * @cssprop [--code-bubble-copy-button-hover-bg-color=rgb(237 237 237)] The background color of the copy code button on hover
 * @cssprop [--code-bubble-copy-button-hover-border-color=rgb(135 135 135)] The border color of the copy code button on hover
 * @cssprop [--code-bubble-copy-button-hover-fg-color=inherit] The text color of the copy code button on hover
 * @cssprop [--code-bubble-button-focus-bg-color=inherit] The background color of the bottom controls on focus
 * @cssprop [--code-bubble-button-focus-border-color=inherit] The border color of the bottom controls on hover
 * @cssprop [--code-bubble-button-focus-fg-color=inherit] The text color of the bottom controls on hover
 * @cssprop [--code-bubble-copy-button-focus-bg-color=inherit] The background color of the copy code button on focus
 * @cssprop [--code-bubble-copy-button-focus-border-color=inherit] The border color of the copy code button on focus
 * @cssprop [--code-bubble-copy-button-focus-fg-color=inherit] The text color of the copy code button on focus
 * @cssprop [--code-bubble-button-active-bg-color=inherit] The background color of the bottom controls on active
 * @cssprop [--code-bubble-button-active-border-color=rgb(135 135 135)] The border color of the bottom controls on active
 * @cssprop [--code-bubble-button-active-fg-color=inherit] The text color of the bottom controls on active
 * @cssprop [--code-bubble-button-active-font-weight=bold] The font weight of the bottom controls on active
 * @cssprop [--code-bubble-copy-button-active-bg-color=inherit] The background color of the copy code button on active
 * @cssprop [--code-bubble-copy-button-active-border-color=rgb(135 135 135)] The border color of the copy code button on active
 * @cssprop [--code-bubble-copy-button-active-fg-color=inherit] The text color of the copy code button on active
 *
 * @csspart code-bubble-base The base wrapper for the internal component
 * @csspart code-bubble-preview The element that wraps the rendered example
 * @csspart code-bubble-code The element that wraps the source code section
 * @csspart code-bubble-copy-button The button used to copy code to the clipboard
 * @csspart code-bubble-controls The element that wraps the controls at the bottom of the component
 * @csspart code-bubble-control The buttons at the bottom of the component
 * @csspart code-bubble-show-source The "show source" button
 * @csspart code-bubble-html The "HTML" button
 * @csspart code-bubble-react The "React" button
 * @csspart code-bubble-rtl The "RTL" button
 * @csspart code-bubble-sandbox The "Sandbox" button
 *
 */
export default class CodeBubble extends LitElement {
  static styles = [styles];

  /** Indicates which example should be displayed */
  @property({ attribute: false })
  framework?: CodeExamples;

  @state()
  protected showSource = false;

  @state()
  protected showRTL = false;

  protected componentConfig: ComponentConfig = {};

  protected openSandbox: (example?: string, exampleType?: string) => void =
    () => {};

  private htmlCode?: string;
  private reactCode?: string;

  constructor() {
    super();
    this.componentConfig = configuration.component!;
    this.updateConfig();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.getCode();
    this.setAttribute('code-bubble', '');
  }

  firstUpdated(): void {
    const preview = document.createElement('div');
    preview.setAttribute('slot', 'preview');
    console.log(this.htmlCode, this.reactCode);
    preview.innerHTML = this.htmlCode || this.reactCode || '';
    this.appendChild(preview);
  }

  protected updateConfig() {
    this.updateComplete.then(() => {
      this.showSource = this.componentConfig.openShowCode!;
      this.framework =
        (localStorage.getItem('code_block_example') as CodeExamples) ||
        this.componentConfig.defaultExample!;
    });
  }

  private getCode() {
    this.getReactCode();
    this.getHtmlCode();
    this.setFallbackFramework();
  }

  private getHtmlCode() {
    let htmlCodeBubble = this.getCodeBubble('html');
    if (
      !htmlCodeBubble &&
      !this.reactCode &&
      this.componentConfig.defaultExample === 'html'
    ) {
      htmlCodeBubble = this.getCodeBubble();
    }

    htmlCodeBubble?.setAttribute('slot', 'html');
    this.htmlCode = htmlCodeBubble?.querySelector('code')?.innerText;
  }

  private getReactCode() {
    const reactCodeBubble = this.getCodeBubble('jsx');
    reactCodeBubble?.setAttribute('slot', 'react');
    this.reactCode = reactCodeBubble?.querySelector('code')?.innerText;
  }

  private getCodeBubble(language?: 'html' | 'jsx') {
    return !language
      ? this.querySelector('pre')
      : this.querySelector(`pre.language-${language}`) ||
          this.querySelector(`pre:has(code.language-${language})`) ||
          this.querySelector(`pre[data-language="${language}"]`) ||
          this.querySelector(`.language-${language} pre`) ||
          this.querySelector(`[data-language="${language}"] pre`);
  }

  private async setFallbackFramework() {
    await this.updateComplete;
    if (this.htmlCode && !this.reactCode) {
      this.framework = 'html';
    } else if (!this.htmlCode && this.reactCode) {
      this.framework = 'react';
    } else {
      this.framework = this.componentConfig.defaultExample!;
    }

    this.requestUpdate();
  }

  private handleExampleClick(example: 'html' | 'react') {
    this.framework = example;
    /** @internal this is used to keep the code blocks in sync */
    this.dispatchEvent(
      new CustomEvent('example-change', { bubbles: true, detail: example }),
    );
    localStorage.setItem('code_block_example', example);
  }

  private handleSandboxClick() {
    const code = this.framework === 'html' ? this.htmlCode : this.reactCode;

    configuration.sandbox === 'codepen'
      ? useCodePenSandbox(code, this.framework)
      : useStackBlitzSandbox(code, this.framework);
  }

  private handleCopyClick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    navigator.clipboard.writeText(
      (this.framework === 'html' ? this.htmlCode : this.reactCode) || '',
    );
    button.innerText = this.componentConfig.copyCodeButtonCopiedLabel!;
    setTimeout(
      () => (button.innerText = this.componentConfig.copyCodeButtonLabel!),
      1_000,
    );
  }

  render() {
    return html`
      <div class="code-bubble-base" part="code-bubble-base">
        <div
          class="preview"
          part="code-bubble-preview"
          dir=${this.showRTL ? 'rtl' : 'auto'}
        >
          <slot name="preview"></slot>
        </div>
        <details
          id="code-bubble"
          class="code-bubble"
          part="code-bubble-code"
          ?open=${this.showSource}
        >
          <!-- required to prevent the user-agent summery from displaying -->
          <summary></summary>
          <slot name="${this.framework || 'html'}"></slot>
          <button
            class="copy-code"
            part="code-bubble-copy-button"
            @click=${this.handleCopyClick}
          >
            ${this.componentConfig.copyCodeButtonLabel}
          </button>
        </details>
        <div class="controls" part="code-bubble-controls">
          <button
            part="code-bubble-control code-bubble-show-source"
            aria-controls="code-bubble"
            aria-expanded=${this.showSource}
            @click=${() => (this.showSource = !this.showSource)}
          >
            ${this.componentConfig.showCodeButtonLabel}
          </button>
          <button
            part="code-bubble-control code-bubble-html"
            aria-pressed=${this.framework === 'html'}
            @click=${() => this.handleExampleClick('html')}
          >
            ${this.componentConfig.htmlButtonLabel}
          </button>
          <button
            part="code-bubble-control code-bubble-react"
            aria-pressed=${this.framework === 'react'}
            @click=${() => this.handleExampleClick('react')}
          >
            ${this.componentConfig.reactButtonLabel}
          </button>
          <button
            part="code-bubble-control code-bubble-rtl"
            aria-pressed=${this.showRTL}
            @click=${() => (this.showRTL = !this.showRTL)}
          >
            ${this.componentConfig.rtlButtonLabel}
          </button>
          <button
            part="code-bubble-control code-bubble-sandbox"
            @click=${this.handleSandboxClick}
          >
            ${this.componentConfig.sandboxButtonLabel}
          </button>
        </div>
      </div>
    `;
  }
}

export { CodeBubble };
