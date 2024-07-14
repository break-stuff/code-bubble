import CodeBlock from '../code-block/code-block.js';
import {
  configuration,
  useStackBlitzSandbox,
} from '../../configs/stack-blitz-configs.js';

/**
 * @tag sb-code-block
 */
export default class SbCodeBlock extends CodeBlock {
  constructor() {
    super();
    this.openSandbox = useStackBlitzSandbox;
    this.componentConfig = configuration.component!;
    this.updateConfig();
  }
}

export { SbCodeBlock };
