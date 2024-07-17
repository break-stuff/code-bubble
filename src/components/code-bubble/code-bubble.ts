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
 * @tag code-bubble
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
    }  else {
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
      <div>
        <div class="code-bubble-base">
          <div class="preview" dir=${this.showRTL ? 'rtl' : 'auto'}>
            <slot name="preview"></slot>
          </div>
          <details
            id="code-bubble"
            class="code-bubble"
            ?open=${this.showSource}
          >
            <!-- required to prevent the user-agent summery from displaying -->
            <summary></summary>
            <slot name="${this.framework || 'html'}"></slot>
            <button
              class="copy-code"
              part="copy-button"
              @click=${this.handleCopyClick}
            >
              ${this.componentConfig.copyCodeButtonLabel}
            </button>
          </details>
          <div class="controls">
            <button
              aria-controls="code-bubble"
              aria-expanded=${this.showSource}
              @click=${() => (this.showSource = !this.showSource)}
            >
              ${this.componentConfig.showCodeButtonLabel}
            </button>
            ${this.htmlCode && this.reactCode
              ? html`
                  <button
                    aria-pressed=${this.framework === 'html'}
                    @click=${() => this.handleExampleClick('html')}
                  >
                    ${this.componentConfig.htmlButtonLabel}
                  </button>
                  <button
                    aria-pressed=${this.framework === 'react'}
                    @click=${() => this.handleExampleClick('react')}
                  >
                    ${this.componentConfig.reactButtonLabel}
                  </button>
                `
              : ''}

            <button
              aria-pressed=${this.showRTL}
              @click=${() => (this.showRTL = !this.showRTL)}
            >
              ${this.componentConfig.rtlButtonLabel}
            </button>
            <button @click=${this.handleSandboxClick}>
              ${this.componentConfig.sandboxButtonLabel}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

export { CodeBubble };
