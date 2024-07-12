import CodeBlock from '../code-block/code-block.js';
import { useStackBlitzSandbox } from '../../editor-configs/stack-blitz-configs.js';

/**
 * @tag sb-code-block
 */
export default class SbCodeBlock extends CodeBlock {
  constructor() {
    super();
    this.openSandbox = useStackBlitzSandbox;
  }
}

export { SbCodeBlock };
