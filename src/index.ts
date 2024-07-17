import CodeBubble from './components/code-bubble/code-bubble.js';
import { CodeBubbleConfig, updateConfig } from './configs/sandbox-configs.js';
import { syncSandboxes } from './utilities/sandbox-sync.js';

export function codeBubble(userConfig?: CodeBubbleConfig) {
  updateConfig(userConfig);
  customElements.define('code-bubble', CodeBubble);
  syncSandboxes();
}
