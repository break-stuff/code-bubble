import { LitElement, html, nothing } from 'lit';
import { eventOptions, property, query, state } from 'lit/decorators.js';
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
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

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
 * @cssprop [--code-bubble-button-icon-gap=0.25rem] The gap between the button text and icon
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
  private _openShowCode = false;

  /** Indicates which example should be displayed */
  @property()
  framework?: string;

  /** Hides the preview display */
  @property({ attribute: 'hide-preview', type: Boolean })
  hidePreview?: boolean;

  /** Hides the copy code button */
  @property({ attribute: 'hide-copy-code', type: Boolean })
  hideCopyCode?: boolean;

  /** Hides the RTL button */
  @property({ attribute: 'hide-rtl', type: Boolean })
  hideRtl?: boolean;

  /** Hides the sandbox button */
  @property({ attribute: 'hide-sandbox', type: Boolean })
  hideSandbox?: boolean;

  /** Hides the resize button */
  @property({ attribute: 'hide-resize', type: Boolean })
  hideResize?: boolean;

  /** Hides the framework buttons */
  @property({ attribute: 'hide-frameworks', type: Boolean })
  hideFrameworks?: boolean;

  /** Hides the show code button */
  @property({ attribute: 'hide-show-code', type: Boolean })
  hideShowCode?: boolean;

  /** Opens the show code button */
  @property({ attribute: 'open-show-code', type: Boolean })
  get openShowCode(): boolean {
    return this._openShowCode || this.showSource;
  }

  set openShowCode(value: boolean) {
    this._openShowCode = value;
    this.showSource = value;
  }

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

  @query('.resize-handle')
  private resizeHandle!: HTMLButtonElement;

  @query('.resize-container')
  private resizeContainer!: HTMLDivElement;

  @query('.preview')
  private preview!: HTMLDivElement;

  constructor() {
    super();
    /** @internal */
    this.config = configs.get(this.tagName?.toLowerCase()) || {};
    this.initProperties();
    this.updateConfig();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('code-bubble', '');
    if (this.hasAttribute('framework')) {
      this.framework = this.getAttribute('framework') as string;
    }
  }

  protected firstUpdated() {
    this.loadCode();
    this.initObserver();
  }

  private loadCode() {
    this.getCode();
    this.createPreview();
  }

  private initObserver() {
    const preview = this.querySelector('[slot="preview"]');
    if (preview?.textContent) {
      return;
    }

    const observer = new MutationObserver(() => {
      if(Object.values(this.codeBlocks)[0]) {
        this.updatePreview();
        observer.disconnect();
        return;
      }

      this.codeBlocks = {};
      this.reloadCode();
    });
    observer.observe(this, { childList: true, subtree: true });
  }

  private reloadCode() {
    this.getCode();
    this.updatePreview();
  }

  private createPreview() {
    if (
      this.componentConfig.preview?.hide ||
      this.querySelector('[slot="preview"]')
    ) {
      return;
    }

    const preview = document.createElement('div');
    preview.setAttribute('slot', 'preview');
    preview.innerHTML =
      this.codeBlocks[this.framework! || Object.keys(this.codeBlocks)[0]] || '';
    this.appendChild(preview);
    this.loadScripts(preview);
  }

  private updatePreview() {
    if (!Object.keys(this.codeBlocks).includes(this.framework || '')) {
      this.framework = Object.keys(this.codeBlocks)[0];
    }

    this.querySelector('[slot="preview"]')?.remove();
    this.createPreview();
  }

  private loadScripts(preview: HTMLDivElement) {
    const scripts = [...preview.getElementsByTagName('script')];

    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else if (script.textContent) {
        newScript.textContent = `(() => {${script.textContent}})()`;
      } else if (script.innerText) {
        newScript.innerText = `(() => {${script.innerText}})()`;
      }

      document.body.appendChild(newScript);
    });
  }

  private updateConfig() {
    this.updateComplete.then(() => {
      this.showSource = this.componentConfig.showCode!;
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
    const blocks = [
      ...this.querySelectorAll('pre:not([slot]):not(:has(pre))'),
    ] as HTMLElement[];
    blocks.forEach((block, i) => {
      const codeContent =
        block.querySelector('[class^="language-"]') ||
        block.querySelector('[data-language]') ||
        block;

      const language =
        codeContent?.className
          ?.split(' ')
          .find(x => x.startsWith('language-'))
          ?.replace('language-', '') ||
        codeContent?.getAttribute('data-language') ||
        i.toString();

      this.setLangOnCodeWrapper(block, language);
      this.codeBlocks[language] = codeContent?.textContent || '';
    });
  }

  private setLangOnCodeWrapper(
    element?: HTMLElement | null,
    language: string = 'html',
  ) {
    if (!element) {
      return;
    }

    if (element?.parentElement?.hasAttribute('code-bubble')) {
      element.setAttribute('slot', language);
      return;
    }

    this.setLangOnCodeWrapper(element?.parentElement, language);
  }

  private async setFallbackFramework() {
    await this.updateComplete;
    this.framework = this.getFramework();
    this.requestUpdate();
  }

  private handleShowSourceClick() {
    this.openShowCode = !this.openShowCode;

    if (typeof this.config.hooks?.onShowCode === 'function') {
      this.config.hooks.onShowCode(this.openShowCode);
    }
  }

  private handleExampleClick(example: string) {
    this.framework = example;
    /** @internal this is used to keep the code blocks in sync */
    this.dispatchEvent(
      new CustomEvent('framework-change', { bubbles: true, detail: example }),
    );
    localStorage.setItem(this.tagName.toLowerCase(), example);

    if (typeof this.config.hooks?.onLanguageChange === 'function') {
      this.config.hooks.onLanguageChange(example);
    }
  }

  private showFrameworkToggles() {
    return (
      Object.keys(this.codeBlocks).length > 1 &&
      !this.componentConfig.frameworkButtons?.hide &&
      !this.hideFrameworks
    );
  }

  private handleRtlClick() {
    this.showRTL = !this.showRTL;

    if (typeof this.config.hooks?.onRtl === 'function') {
      this.config.hooks.onRtl(this.showRTL);
    }
  }

  private handleSandboxClick() {
    const code = this.codeBlocks[this.framework!] ?? '';
    const framework = !isNaN(Number(this.framework))
      ? Object.keys(this.sandboxConfig)[parseInt(this.framework!)]
      : this.framework;
    const config = structuredClone(this.sandboxConfig[framework!]);

    if (!config) {
      throw new Error(`Invalid example type: ${framework}`);
    }

    if (typeof this.config.hooks?.onSandboxOpen === 'function') {
      this.config.hooks.onSandboxOpen(config);
    }

    this.config.sandbox === 'codepen'
      ? useCodePenSandbox(config, code)
      : useStackBlitzSandbox(config, code);
  }

  private handleCopyClick(e: MouseEvent | TouchEvent) {
    const button = e.target as HTMLButtonElement;
    navigator.clipboard.writeText(this.codeBlocks[this.framework!] || '');
    button.innerText = this.componentConfig.copyCodeButton?.copiedLabel || '';
    setTimeout(
      () =>
        (button.innerText = this.componentConfig.copyCodeButton?.label || ''),
      1_000,
    );

    if (typeof this.config.hooks?.onCopy === 'function') {
      this.config.hooks.onCopy();
    }
  }

  private getFramework() {
    return (
      this.framework ||
      this.componentConfig.defaultExample! ||
      Object.keys(this.codeBlocks)[0]
    );
  }

  @eventOptions({ passive: true })
  private handleDrag(e: TouchEvent) {
    const startX = e.changedTouches
      ? e.changedTouches[0].pageX
      : (e as unknown as MouseEvent).clientX;
    const startWidth = parseInt(
      getComputedStyle(this.resizeContainer).width,
      10,
    );
    const preview = this.preview;
    const resizeContainer = this.resizeContainer;
    const resizeHandle = this.resizeHandle;
    dragStart(e);

    resizeContainer.classList.add('dragging');
    document.documentElement.addEventListener('mousemove', dragStart);
    document.documentElement.addEventListener('touchmove', dragStart);
    document.documentElement.addEventListener('mouseup', dragStop);
    document.documentElement.addEventListener('touchend', dragStop);

    function dragStart(e: TouchEvent | MouseEvent) {
      const width =
        startWidth +
        ((e as unknown as TouchEvent).changedTouches
          ? (e as unknown as TouchEvent).changedTouches[0].pageX
          : (e as unknown as MouseEvent).pageX) -
        startX;

      if (preview.clientWidth - resizeHandle.clientWidth * 2.5 <= width) {
        resizeContainer.style.maxWidth = '';
      } else {
        resizeContainer.style.maxWidth = `${width}px`;
      }
    }

    function dragStop() {
      resizeContainer.classList.remove('dragging');
      document.documentElement.removeEventListener('mousemove', dragStart);
      document.documentElement.removeEventListener('touchmove', dragStart);
      document.documentElement.removeEventListener('mouseup', dragStop);
      document.documentElement.removeEventListener('touchend', dragStop);
    }
  }

  render() {
    return html`
      <div class="code-bubble-base" part="code-bubble-base">
        ${!this.hidePreview && !this.componentConfig.preview?.hide
          ? html`<div
              class="preview"
              part="code-bubble-preview"
              dir=${this.showRTL ? 'rtl' : 'auto'}
            >
              <div class="resize-container">
                <slot name="preview"></slot>
                ${!this.hideResize && !this.componentConfig.resizeButton?.hide
                  ? html`<button
                      class="resize-handle"
                      @mousedown=${this.handleDrag}
                      @touchstart=${this.handleDrag}
                    >
                      <span class="visually-hidden"
                        >${this.componentConfig.resizeButton?.label}</span
                      >
                      ${unsafeSVG(this.componentConfig.resizeButton?.icon)}
                    </button>`
                  : nothing}
              </div>
            </div>`
          : ''}
        <details
          id="code-bubble"
          class="code-bubble"
          part="code-bubble-code"
          ?open=${this.openShowCode}
        >
          <!-- required to prevent the user-agent summery from displaying -->
          <summary>${this.getFramework()}"</summary>
          <slot name="${this.getFramework()}"></slot>
          ${!this.hideCopyCode && !this.componentConfig.copyCodeButton?.hide
            ? html`<button
                class="copy-code-button"
                part="code-bubble-copy-button"
                @click=${this.handleCopyClick}
              >
                <span
                  class="${this.componentConfig.copyCodeButton?.hideLabel
                    ? 'visually-hidden'
                    : ''}"
                >
                  ${this.componentConfig.copyCodeButton?.label}
                </span>
                ${this.componentConfig.copyCodeButton?.icon
                  ? unsafeSVG(this.componentConfig.copyCodeButton?.icon)
                  : ''}
              </button>`
            : ''}
        </details>
        <div class="controls" part="code-bubble-controls">
          ${!this.hideShowCode && !this.componentConfig.showCodeButton?.hide
            ? html`<button
                class="show-code-button"
                part="code-bubble-control code-bubble-show-source"
                aria-controls="code-bubble"
                aria-expanded=${this.showSource}
                @click=${this.handleShowSourceClick}
              >
                <span
                  class="${this.componentConfig.copyCodeButton?.hideLabel
                    ? 'visually-hidden'
                    : ''}"
                >
                  ${this.showSource
                    ? this.componentConfig.showCodeButton?.openedLabel
                    : this.componentConfig.showCodeButton?.closedLabel}
                </span>
                ${this.showSource &&
                this.componentConfig.showCodeButton?.openedIcon
                  ? unsafeSVG(this.componentConfig.showCodeButton?.openedIcon)
                  : unsafeSVG(this.componentConfig.showCodeButton?.closedIcon)}
              </button>`
            : nothing}
          ${this.showFrameworkToggles()
            ? Object.keys(this.codeBlocks).map(
                x =>
                  html` <button
                    class="framework-button"
                    part="code-bubble-control code-bubble-html"
                    aria-pressed=${this.framework === x}
                    @click=${() => this.handleExampleClick(x)}
                  >
                    <span
                      class="${this.componentConfig.copyCodeButton?.hideLabel
                        ? 'visually-hidden'
                        : ''}"
                    >
                      ${this.componentConfig.frameworkButtons?.label!(x)}
                    </span>
                    ${this.componentConfig.frameworkButtons?.icon
                      ? unsafeSVG(
                          this.componentConfig.frameworkButtons?.icon(x),
                        )
                      : ''}
                  </button>`,
              )
            : nothing}
          ${!this.hideRtl && !this.componentConfig.rtlButton?.hide
            ? html`<button
                class="rtl-button"
                part="code-bubble-control code-bubble-rtl"
                aria-pressed=${this.showRTL}
                @click=${this.handleRtlClick}
              >
                <span
                  class="${this.componentConfig.rtlButton?.hideLabel
                    ? 'visually-hidden'
                    : ''}"
                >
                  ${this.componentConfig.rtlButton?.label}
                </span>
                ${this.componentConfig.rtlButton?.icon
                  ? unsafeSVG(this.componentConfig.rtlButton?.icon)
                  : ''}
              </button>`
            : nothing}
          ${!this.hideSandbox && !this.componentConfig.sandboxButton?.hide
            ? html`<button
                class="sandbox-button"
                part="code-bubble-control code-bubble-sandbox"
                @click=${this.handleSandboxClick}
              >
                <span
                  class="${this.componentConfig.sandboxButton?.hideLabel
                    ? 'visually-hidden'
                    : ''}"
                >
                  ${this.componentConfig.sandboxButton?.label}
                </span>
                ${this.componentConfig.sandboxButton?.icon
                  ? unsafeSVG(this.componentConfig.sandboxButton?.icon)
                  : ''}
              </button>`
            : nothing}
        </div>
      </div>
    `;
  }
}

export { CodeBubble };
