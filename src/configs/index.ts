import CodeBubble from '../components/code-bubble/code-bubble.js';
import { mergeDeep } from '../utilities/deep-merge.js';
import { syncSandboxes } from '../utilities/sandbox-sync.js';
import { defaultCodeBubbleConfig } from './default-values.js';
import type { CodeBubbleConfig } from './types.js';

export * from './types.js';

export const configs: Map<string, CodeBubbleConfig> = new Map();

/**
 * This class creates a new instance of the CodeBubble component with the specified configuration.
 * @param {CodeBubbleConfig} config The configuration object for the CodeBubble component.
 */
export class CodeBlock {
  tagName = '';
  config = { ...defaultCodeBubbleConfig };

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

  /** The updates the selected language for all instances of this component on the page as well as the locally stored value. */
  setLanguage(lang: string) {
    document
      .querySelectorAll<CodeBubble>(this.config.component!.tagName!)
      .forEach(y => {
        y.framework = lang;
      });
    localStorage.setItem(this.config.component!.tagName!.toLowerCase(), lang);
  }

  /**
   * This updates the configuration for all existing and new instances of this component.
   * _The component tag name cannot be changed after the component has been created._
   * NOTE: If your environment uses DOM caching, you may need to refresh the page to see the changes.
   */
  updateConfig(userConfig: CodeBubbleConfig) {
    if (userConfig.component?.tagName !== this.tagName) {
      console.error(
        `The component tag name cannot be changed after the component has been created. If you need a component with a new tag name, please create a new instance of the CodeBubble class.`,
      );
      return;
    }

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
