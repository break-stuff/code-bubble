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
    customElements.define(this.config.tagName!, CodeBubble);
    syncSandboxes();
  }

  private updateConfig(userConfig?: CodeBubbleConfig) {
    this.config = mergeDeep(this.config as never, userConfig as never);
    configs[this.config.tagName!] = this.config;
  }
}
