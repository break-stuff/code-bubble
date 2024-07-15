import CodeBubble from '../code-bubble/code-bubble.js';
import {
  configuration,
  useStackBlitzSandbox,
} from '../../configs/stack-blitz-configs.js';

/**
 * @tag sb-code-bubble
 */
export default class SbCodeBubble extends CodeBubble {
  constructor() {
    super();
    this.openSandbox = useStackBlitzSandbox;
    this.componentConfig = configuration.component!;
    this.updateConfig();
  }
}

export { SbCodeBubble };
