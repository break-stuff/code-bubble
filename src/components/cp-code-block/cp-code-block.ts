import CodeBlock from '../code-block/code-block.js';
import { useCodePenSandbox } from '../../editor-configs/code-pen-sandbox.js';

/**
 * @tag cp-code-block
 */
export default class CpCodeBlock extends CodeBlock {
  constructor() {
    super();
    this.openSandbox = useCodePenSandbox;
  }
}

export { CpCodeBlock };
