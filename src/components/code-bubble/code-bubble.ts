import { LitElement, PropertyValues, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from './code-bubble.styles.js';
import type {
  CodeBubbleConfig,
  CodePen,
  ComponentConfig,
  FrameworkConfig,
  StackBlitz,
} from '../../configs/types.js';
import { configs } from '../../configs/index.js';
import {
  useCodePenSandbox,
  useStackBlitzSandbox,
} from '../../utilities/sandbox-helpers.js';

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
  private _config: CodeBubbleConfig = {};

  /** @internal Indicates which example should be displayed */
  @property({ attribute: false })
  framework?: string;

  /** @internal The configuration object for the component */
  @property({ attribute: false })
  public get config(): CodeBubbleConfig {
    return this._config;
  }

  public set config(value: CodeBubbleConfig) {
    this._config = value;
    this.initProperties();
    this.updateConfig();
  }

  @state()
  protected showSource = false;

  @state()
  protected showRTL = false;

  @state()
  protected codeBlocks: CodeBlock = {};

  @state()
  protected componentConfig: ComponentConfig = {};

  @state()
  protected sandboxConfig: FrameworkConfig<CodePen | StackBlitz> = {};

  constructor() {
    super();
    /** @internal */
    this.config = configs[this.tagName?.toLowerCase() || ''];
    this.initProperties();
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
    preview.innerHTML =
      this.codeBlocks[this.framework! || Object.keys(this.codeBlocks)[0]];
    this.appendChild(preview);
  }

  private updateConfig() {
    this.updateComplete.then(() => {
      this.showSource = this.componentConfig.openShowCode!;
      this.framework =
        localStorage.getItem(this.tagName) ||
        this.componentConfig.defaultExample! ||
        Object.keys(this.codeBlocks)[0];
    });
  }

  private initProperties() {
    this.componentConfig = this.config.component!;
    this.sandboxConfig =
      this.config.sandbox === 'codepen'
        ? this.config.sandboxConfig!.codePen!
        : this.config.sandboxConfig!.stackBlitz!;
  }

  private getCode() {
    this.setCodeContent();
    this.setFallbackFramework();
  }

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
      this.codeBlocks[language] = block?.textContent || '';
    });
  }

  private async setFallbackFramework() {
    await this.updateComplete;
    this.framework = this.getFramework();
    this.requestUpdate();
  }

  private handleExampleClick(example: string) {
    this.framework = example;
    /** @internal this is used to keep the code blocks in sync */
    this.dispatchEvent(
      new CustomEvent('framework-change', { bubbles: true, detail: example }),
    );
    localStorage.setItem(this.tagName.toLowerCase(), example);
  }

  private showFrameworkToggles() {
    return (
      Object.keys(this.codeBlocks).length > 1 &&
      !this.componentConfig.hideFrameworkButtons
    );
  }

  private handleSandboxClick() {
    const code = this.codeBlocks[this.framework!] ?? '';
    const framework = !isNaN(Number(this.framework))
      ? Object.keys(this.sandboxConfig)[parseInt(this.framework!)]
      : this.framework;
    const config = this.sandboxConfig[framework!];

    if (!config) {
      throw new Error(`Invalid example type: ${framework}`);
    }

    this.config.sandbox === 'codepen'
      ? useCodePenSandbox(config, code)
      : useStackBlitzSandbox(config, code);
  }

  private handleCopyClick(e: MouseEvent) {
    const button = e.target as HTMLButtonElement;
    navigator.clipboard.writeText(this.codeBlocks[this.framework!] || '');
    button.innerText = this.componentConfig.copyCodeButtonCopiedLabel!;
    setTimeout(
      () => (button.innerText = this.componentConfig.copyCodeButtonLabel!),
      1_000,
    );
  }

  private getFramework() {
    return (
      this.framework ||
      this.componentConfig.defaultExample! ||
      Object.keys(this.codeBlocks)[0]
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
          <summary>${this.getFramework()}"</summary>
          <slot name="${this.getFramework()}"></slot>
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
            ? Object.keys(this.codeBlocks).map(
                x =>
                  html` <button
                    part="code-bubble-control code-bubble-html"
                    aria-pressed=${this.framework === x}
                    @click=${() => this.handleExampleClick(x)}
                  >
                    ${this.componentConfig.frameworkButtonLabel!(x)}
                  </button>`,
              )
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
