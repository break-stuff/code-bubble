import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from './code-bubble.styles.js';
import type { CodeBubbleConfig, ComponentConfig } from '../../configs/types.js';
import { configs } from '../../configs/index.js';
import {
  useCodePenSandbox,
  useStackBlitzSandbox,
} from '../../utilities/sandbox-helpers.js';
export type CodeExamples = 'html' | 'react';

type CodeBlock = { [key: string]: string };

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

  @state()
  protected codeBlocks: CodeBlock = {};

  protected componentConfig: ComponentConfig = {};

  protected openSandbox: (example?: string, exampleType?: string) => void =
    () => {};

  // private htmlCode?: string | null;
  // private reactCode?: string | null;
  private config: CodeBubbleConfig = {};

  constructor() {
    super();
    this.componentConfig = configs[this.tagName.toLowerCase()].component!;
    this.updateConfig();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.getCode();
    this.setAttribute('code-bubble', '');
  }

  firstUpdated(): void {
    this.createPreview();
  }

  private createPreview() {
    if (this.componentConfig.hidePreview) {
      return;
    }

    const preview = document.createElement('div');
    preview.setAttribute('slot', 'preview');
    console.log("CODE", this.framework, this.codeBlocks);
    preview.innerHTML = this.codeBlocks[this.framework!];
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
    // this.getReactCode();
    // this.getHtmlCode();
    this.setCodeContent();
    this.setFallbackFramework();
  }

  // private getHtmlCode() {
  //   let htmlCodeBubble = this.getCodeContent('html');
  //   if (
  //     !htmlCodeBubble &&
  //     !this.reactCode &&
  //     this.componentConfig.defaultExample === 'html'
  //   ) {
  //     htmlCodeBubble = this.getCodeContent();
  //   }

  //   htmlCodeBubble?.setAttribute('slot', 'html');
  //   this.htmlCode = htmlCodeBubble?.querySelector('code')?.textContent;
  // }

  // private getReactCode() {
  //   const reactCodeBubble = this.getCodeContent('jsx');
  //   reactCodeBubble?.setAttribute('slot', 'react');
  //   this.reactCode = reactCodeBubble?.querySelector('code')?.textContent;
  // }

  private setCodeContent() {
    const blocks = [...this.querySelectorAll('pre')];
    blocks.forEach((block, i) => {
      const codeContent =
        block.querySelector('[class^="language-"]') ||
        block.querySelector('[data-language]');
      const language =
        codeContent?.className
          ?.split(' ')
          .find(x => x.startsWith('language-'))
          ?.replace('language-', '') ||
        codeContent?.getAttribute('data-language') ||
        i.toString();

      block.setAttribute('slot', language);
      this.codeBlocks[language] = codeContent?.textContent || '';
    });

    // return !language
    //   ? this.querySelector('pre')
    //   : this.querySelector(`pre.language-${language}`) ||
    //       this.querySelector(`pre:has(code.language-${language})`) ||
    //       this.querySelector(`pre[data-language="${language}"]`) ||
    //       this.querySelector(`.language-${language} pre`) ||
    //       this.querySelector(`[data-language="${language}"] pre`);
  }

  private async setFallbackFramework() {
    await this.updateComplete;
    this.framework =
      this.componentConfig.defaultExample! || Object.keys(this.codeBlocks)[0];
    this.requestUpdate();
  }

  private handleExampleClick(example: 'html' | 'react') {
    this.framework = example;
    /** @internal this is used to keep the code blocks in sync */
    this.dispatchEvent(
      new CustomEvent('framework-change', { bubbles: true, detail: example }),
    );
    localStorage.setItem('code_block_example', example);
  }

  private showFrameworkToggles() {
    return (
      Object.keys(this.codeBlocks).length > 1 &&
      !this.componentConfig.hideFrameworkButtons
    );
  }

  private handleSandboxClick() {
    const config = this.config.sandboxConfig;
    const code = this.codeBlocks[this.framework!] || '';

    this.config.sandbox === 'codepen'
      ? useCodePenSandbox(
          config!.codePen![this.framework!]!,
          code ?? '',
          this.framework,
        )
      : useStackBlitzSandbox(
          config!.stackBlitz![this.framework!]!,
          code ?? '',
          this.framework,
        );
  }

  private handleCopyClick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    navigator.clipboard.writeText(
      this.codeBlocks[this.framework!] || '',
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
        ${!this.componentConfig.hidePreview &&
        html`<div
          class="preview"
          part="code-bubble-preview"
          dir=${this.showRTL ? 'rtl' : 'auto'}
        >
          <slot name="preview"></slot>
        </div>`}
        <details
          id="code-bubble"
          class="code-bubble"
          part="code-bubble-code"
          ?open=${this.showSource}
        >
          <!-- required to prevent the user-agent summery from displaying -->
          <summary></summary>
          <slot name="${this.framework || 'html'}"></slot>
          ${!this.componentConfig.hideCopyCodeButton &&
          html`<button
            class="copy-code"
            part="code-bubble-copy-button"
            @click=${this.handleCopyClick}
          >
            ${this.componentConfig.copyCodeButtonLabel}
          </button>`}
        </details>
        <div class="controls" part="code-bubble-controls">
          ${!this.componentConfig.hideShowCodeButton
            ? html`<button
                part="code-bubble-control code-bubble-show-source"
                aria-controls="code-bubble"
                aria-expanded=${this.showSource}
                @click=${() => (this.showSource = !this.showSource)}
              >
                ${this.componentConfig.showCodeButtonLabel}
              </button>`
            : nothing}
          ${this.showFrameworkToggles()
            ? html` <button
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
                </button>`
            : nothing}
          ${!this.componentConfig.hideRtlButton
            ? html`<button
                part="code-bubble-control code-bubble-rtl"
                aria-pressed=${this.showRTL}
                @click=${() => (this.showRTL = !this.showRTL)}
              >
                ${this.componentConfig.rtlButtonLabel}
              </button>`
            : nothing}
          ${!this.componentConfig.hideSandboxButton
            ? html`<button
                part="code-bubble-control code-bubble-sandbox"
                @click=${this.handleSandboxClick}
              >
                ${this.componentConfig.sandboxButtonLabel}
              </button>`
            : nothing}
        </div>
      </div>
    `;
  }
}

export { CodeBubble };
