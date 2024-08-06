import CodeBubble from '../components/code-bubble/code-bubble.js';
import { mergeDeep } from '../utilities/deep-merge.js';
import { syncSandboxes } from '../utilities/sandbox-sync.js';
import { defaultCodeBubbleConfig } from './default-values.js';
import type { CodeBubbleConfig } from './types.js';

export * from './types.js';

export const configs: { [key: string]: CodeBubbleConfig } = {};

export class CodeBlock {
  config = defaultCodeBubbleConfig;

  constructor(config?: CodeBubbleConfig) {
    this.updateConfig(config);
    try {
      customElements.define(this.config.component!.tagName!, class extends CodeBubble {});
    } catch (error) {
      console.error('Error defining custom element', error);
    }
    syncSandboxes();
  }

  setLanguage(lang: string) {
    document.querySelectorAll<CodeBubble>(this.config.component!.tagName!).forEach(y => {
      y.framework = lang;
    });
    localStorage.setItem(this.config.component!.tagName!.toLowerCase(), lang);
  }

  private updateConfig(userConfig?: CodeBubbleConfig) {
    this.config = mergeDeep(this.config as never, userConfig as never);
    configs[this.config.component!.tagName!] = this.config;
  }
}
