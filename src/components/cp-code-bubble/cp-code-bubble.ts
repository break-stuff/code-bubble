import CodeBubble from '../code-bubble/code-bubble.js';
import { configuration, useCodePenSandbox } from '../../configs/code-pen-sandbox.js';

/**
 * @tag cp-code-bubble
 */
export default class CpCodeBubble extends CodeBubble {
  constructor() {
    super();
    this.openSandbox = useCodePenSandbox;
    this.componentConfig = configuration.component!;
    this.updateConfig();
  }
}

export { CpCodeBubble };
