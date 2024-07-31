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
    console.log(this.config.component!.tagName!, customElements.get(this.config.component!.tagName!));
    try {
      customElements.define(this.config.component!.tagName!, class extends CodeBubble {});
    } catch (error) {
      console.error('Error defining custom element', error);
      
    }
    syncSandboxes();
  }

  private updateConfig(userConfig?: CodeBubbleConfig) {
    this.config = mergeDeep(this.config as never, userConfig as never);
    configs[this.config.component!.tagName!] = this.config;
  }
}
