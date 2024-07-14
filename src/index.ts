import CpCodeBlock from './components/cp-code-block/cp-code-block.js';
import SbCodeBlock from './components/sb-code-block/sb-code-block.js';
import { CodePenConfig, updateCodePenConfig } from './configs/code-pen-sandbox.js';
import { StackBlitzConfig, updateStackBlitzConfig } from './configs/stack-blitz-configs.js';
import { syncSandboxes } from './utilities/sandbox-sync.js';

export function sbCodeBloc(userConfig?: StackBlitzConfig) {
  updateStackBlitzConfig(userConfig);
  customElements.define('sb-code-block', SbCodeBlock);
  syncSandboxes();
}

export function cpCodeBlock(userConfig?: CodePenConfig) {
  updateCodePenConfig(userConfig);
  customElements.define('cp-code-block', CpCodeBlock);
  syncSandboxes();
}
