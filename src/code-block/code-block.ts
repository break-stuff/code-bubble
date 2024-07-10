import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from './code-block.styles.js';
import { openSandbox } from './sandbox-configs.js';

/**
 * @tag stack-blitz-code-block
 */
export default class CodeBlock extends LitElement {
  static styles = [styles];

  /** Indicates which example should be displayed */
  @property()
  example: 'html' | 'react' = 'html';

  @state()
  private showSource = false;

  @state()
  private showRTL = false;

  private htmlCode?: string;
  private reactCode?: string;

  connectedCallback(): void {
    super.connectedCallback();
    this.getCode();
    this.example = localStorage.getItem('code_block_example') === 'react' ? 'react' : 'html';
  }

  firstUpdated(): void {
    const preview = document.createElement('div');
    preview.setAttribute('slot', 'preview');
    preview.innerHTML = this.htmlCode || '';
    this.appendChild(preview);
  }

  private getCode() {
    const htmlCodeBlock = this.querySelector('pre:has(code.language-html)');
    htmlCodeBlock?.setAttribute('slot', 'html');
    this.htmlCode = htmlCodeBlock?.querySelector('code')?.innerText;

    const reactCodeBlock = this.querySelector('pre:has(code.language-jsx)');
    reactCodeBlock?.setAttribute('slot', 'react');
    this.reactCode = reactCodeBlock?.querySelector('code')?.innerText;
  }

  private handleExampleClick(example: 'html' | 'react') {
    this.example = example;
    this.dispatchEvent(new CustomEvent('example-change', { detail: example }));
    localStorage.setItem('code_block_example', example);
  }

  private handleSandboxClick() {
    openSandbox(this.example === 'html' ? this.htmlCode : this.reactCode);
  }

  private handleCopyClick() {
    navigator.clipboard.writeText((this.example === 'html' ? this.htmlCode : this.reactCode) || '');
  }

  render() {
    return html`
      <div>
        <div class="code-block-base">
          <div class="preview" dir=${this.showRTL ? 'rtl' : 'auto'}>
            <slot name="preview"></slot>
          </div>
          <details id="code-block" class="code-block" ?open=${this.showSource}>
            <summary></summary>
            <slot name="${this.example || 'html'}"></slot>
            <button class="copy-code" @click=${this.handleCopyClick}>Copy</button>
          </details>
          <div class="controls">
            <button
              aria-controls="code-block"
              aria-expanded=${this.showSource}
              @click=${() => (this.showSource = !this.showSource)}
            >
              ${this.showSource ? 'Hide' : 'Show'} Source
            </button>
            <button
              aria-pressed=${this.example === 'html'}
              @click=${() => this.handleExampleClick('html')}
            >
              HTML
            </button>
            <button
              aria-pressed=${this.example === 'react'}
              @click=${() => this.handleExampleClick('react')}
            >
              React
            </button>
            <button
              aria-pressed=${this.showRTL}
              @click=${() => (this.showRTL = !this.showRTL)}
            >
              RTL
            </button>
            <button @click=${this.handleSandboxClick}>Sandbox</button>
          </div>
        </div>
      </div>
    `;
  }
}

export { CodeBlock };
