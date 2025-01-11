import CodeBubble from '../components/code-bubble/code-bubble.js';
import { mergeDeep } from '../utilities/deep-merge.js';
import { syncSandboxes } from '../utilities/sandbox-sync.js';
import { configs } from './configs.js';
import { defaultCodeBubbleConfig } from './default-values.js';
import type { CodeBubbleConfig } from './types.js';

export * from './types.js';


/**
 * This class creates a new instance of the CodeBubble component with the specified configuration.
 * @param {CodeBubbleConfig} config The configuration object for the CodeBubble component.
 */
export class CodeBlock {
  tagName = '';
  config: CodeBubbleConfig = { ...defaultCodeBubbleConfig };

  constructor(config?: CodeBubbleConfig) {
    this.tagName = config?.component?.tagName || 'code-bubble';
    if (configs.get(this.tagName)) {
      console.error(
        `A component with the tag name ${this.tagName} already exists. Please specify a new component tag name.`,
      );
      return;
    }

    this.setConfig(config);
    try {
      customElements.define(this.tagName, class extends CodeBubble {});
    } catch (error) {
      console.error('Error defining custom element', error);
    }
    syncSandboxes();
  }


  private setConfig(userConfig?: CodeBubbleConfig) {
    this.config = mergeDeep(this.config as never, userConfig as never);
    configs.set(this.tagName, this.config);
  }
}
