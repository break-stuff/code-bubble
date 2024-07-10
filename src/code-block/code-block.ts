import { LitElement, html } from 'lit';
import styles from './code-block.styles.js';

/**
 * @tag stack-blitz-code-block
 */
export default class CodeBlock extends LitElement {
  static styles = [styles];
  render() {
    return html` <div>Hello from MyElement!</div> `;
  }
}

export { CodeBlock };
