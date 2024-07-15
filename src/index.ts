import CpCodeBubble from './components/cp-code-bubble/cp-code-bubble.js';
import SbCodeBubble from './components/sb-code-bubble/sb-code-bubble.js';
import { CodePenConfig, updateCodePenConfig } from './configs/code-pen-sandbox.js';
import { StackBlitzConfig, updateStackBlitzConfig } from './configs/stack-blitz-configs.js';
import { syncSandboxes } from './utilities/sandbox-sync.js';

export function sbCodeBloc(userConfig?: StackBlitzConfig) {
  updateStackBlitzConfig(userConfig);
  customElements.define('sb-code-bubble', SbCodeBubble);
  syncSandboxes();
}

export function cpCodeBubble(userConfig?: CodePenConfig) {
  updateCodePenConfig(userConfig);
  customElements.define('cp-code-bubble', CpCodeBubble);
  syncSandboxes();
}
