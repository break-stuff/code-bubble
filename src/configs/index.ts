import CodeBubble from '../components/code-bubble/code-bubble.js';
import { mergeDeep } from '../utilities/deep-merge.js';
import { syncSandboxes } from '../utilities/sandbox-sync.js';
import { defaultCodeBubbleConfig } from './default-values.js';
import type { CodeBubbleConfig } from './types.js';

export * from './types.js';

export const configs: Map<string, CodeBubbleConfig> = new Map();

export class CodeBlock {
  tagName = '';
  config = { ...defaultCodeBubbleConfig };

  constructor(config?: CodeBubbleConfig) {
    this.tagName = config?.component?.tagName || 'code-bubble';
    this.setConfig(config);
    try {
      customElements.define(this.tagName, class extends CodeBubble {});
    } catch (error) {
      console.error('Error defining custom element', error);
    }
    syncSandboxes();
  }

  setLanguage(lang: string) {
    document
      .querySelectorAll<CodeBubble>(this.config.component!.tagName!)
      .forEach(y => {
        y.framework = lang;
      });
    localStorage.setItem(this.config.component!.tagName!.toLowerCase(), lang);
  }

  updateConfig(userConfig: CodeBubbleConfig) {
    this.setConfig(userConfig);
    this.updateComponentConfig();
  }

  private setConfig(userConfig?: CodeBubbleConfig) {
    this.config = mergeDeep(this.config as never, userConfig as never);
    configs.set(this.tagName, this.config);
  }

  private updateComponentConfig() {
    document
      .querySelectorAll<CodeBubble>(this.config.component!.tagName!)
      .forEach(y => {
        y.config = this.config;
      });
  }
}
