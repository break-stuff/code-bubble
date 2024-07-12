import { css } from 'lit';

export default css`
  :host {
    --code-block-border-color: rgb(228, 228, 231);
    --code-block-border-radius: 4px;
    --code-block-border-width: 1px;
    --code-block-preview-padding: 1.5rem;
    --code-block-snippet-padding: 1.5rem;

    --code-block-button-font-weight: inherit;
    --code-block-button-icon-gap: 0.5rem;
    --code-block-button-padding-x: 1rem;
    --code-block-button-padding-y: 1rem;
    --code-block-outline: solid 2px rgb(0, 95, 204);
    --code-block-outline-offset: 0;

    /** Rest */
    --code-block-button-bg-color: inherit;
    --code-block-button-border-color: var(--code-block-border-color);
    --code-block-button-fg-color: inherit;

    /** Hover */
    --code-block-button-hover-bg-color: rgb(237 237 237);
    --code-block-button-hover-border-color: rgb(135 135 135);
    --code-block-button-hover-fg-color: inherit;

    /** Focus */
    --code-block-button-focus-bg-color: inherit;
    --code-block-button-focus-border-color: inherit;
    --code-block-button-focus-fg-color: inherit;

    /** Active */
    --code-block-button-active-bg-color: inherit;
    --code-block-button-active-border-color: rgb(135 135 135);
    --code-block-button-active-fg-color: inherit;
    --code-block-button-active-font-weight: bold;


    display: block;
  }

  .preview {
    padding: var(--code-block-preview-padding);
    border: solid var(--code-block-border-width)
      var(--code-block-border-color);
  }

  .code-block {
    margin: 0;
    border-inline: solid var(--code-block-border-width)
      var(--code-block-border-color);
    position: relative;
  }

  .code-block summary {
    display: none;
  }

  .copy-code {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    margin: 1rem;
  }

  *::slotted(pre) {
    margin: 0;
    padding: var(--code-block-snippet-padding);
    background-color: rgb(249, 249, 249);
  }

  .controls {
    display: flex;
    position: relative;
    border-bottom-left-radius: var(--code-block-border-radius);
    border-bottom-right-radius: var(--code-block-border-radius);
    display: flex;
    margin-top: calc(var(--code-block-border-width) * -1);
  }

  .controls button {
    font-weight: var(--code-block-button-font-weight);
    padding: var(--code-block-button-padding-y)
      var(--code-block-button-padding-x);
    background-color: var(--code-block-button-bg-color);
    color: var(--code-block-button-fg-color);
    border: solid 1px var(--code-block-button-border-color);
    cursor: pointer;
  }

  .controls button:focus-visible {
    outline: var(--code-block-outline);
    outline-offset: var(--code-block-outline-offset);
    z-index: 1;
  }

  .controls button[aria-pressed='true'] {
    background-color: var(--code-block-button-active-bg-color);
    color: var(--code-block-button-active-fg-color);
    font-weight: var(--code-block-button-active-font-weight);
  }

  .controls button:hover {
    background-color: var(--code-block-button-hover-bg-color);
    color: var(--code-block-button-hover-fg-color);
    outline: solid var(--code-block-border-width) var(--code-block-button-hover-border-color);
    outline-offset: calc(var(--code-block-border-width) * -2);
  }
  
  .controls button:not(:last-of-type) {
    border-right: solid 1px var(--code-block-button-border-color);
  }

  .controls button:first-of-type {
    flex: 1 1 auto;
    border-bottom-left-radius: var(--code-block-border-radius);
  }  
  
  .controls button:last-of-type {
    border-bottom-right-radius: var(--code-block-border-radius);
  }

  .controls button:not(:first-of-type) {
    margin-inline-start: calc(var(--code-block-border-width) * -1);
  }

`;
