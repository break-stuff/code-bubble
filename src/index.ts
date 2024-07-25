import CodeBubble, { CodeExamples } from './components/code-bubble/code-bubble.js';
import { CodeBubbleConfig, updateConfig } from './configs/sandbox-configs.js';
import { syncSandboxes } from './utilities/sandbox-sync.js';

export type { CodeBubbleConfig } from './configs/sandbox-configs.js';

export function setLanguage(lang: string) {
  document.querySelectorAll<CodeBubble>('[code-bubble]').forEach(y => {
    y.framework = lang as CodeExamples;
  });
  localStorage.setItem('code_block_example', lang);
}

export function codeBubble(userConfig?: CodeBubbleConfig) {
  updateConfig(userConfig);
  customElements.define('code-bubble', CodeBubble);
  syncSandboxes();
}
