import CodeBlock from '../code-block/code-block.js';
import { configuration, useCodePenSandbox } from '../../configs/code-pen-sandbox.js';

/**
 * @tag cp-code-block
 */
export default class CpCodeBlock extends CodeBlock {
  constructor() {
    super();
    this.openSandbox = useCodePenSandbox;
    this.componentConfig = configuration.component!;
    this.updateConfig();
  }
}

export { CpCodeBlock };
