import { css } from 'lit';

export default css`
  :host {
    --code-bubble-border-color: rgb(228, 228, 231);
    --code-bubble-border-radius: 4px;
    --code-bubble-border-width: 1px;
    --code-bubble-preview-padding: 1.5rem;
    --code-bubble-snippet-padding: 1.5rem;

    --code-bubble-button-font-weight: inherit;
    --code-bubble-button-icon-gap: 0.25rem;
    --code-bubble-button-padding-x: 1rem;
    --code-bubble-button-padding-y: 1rem;
    --code-bubble-copy-button-font-weight: inherit;
    --code-bubble-copy-button-padding-x: 0.5rem;
    --code-bubble-copy-button-padding-y: 0.5rem;
    --code-bubble-outline: solid 2px rgb(0, 95, 204);
    --code-bubble-outline-offset: 0;

    /** Rest */
    --code-bubble-button-bg-color: inherit;
    --code-bubble-button-border-color: var(--code-bubble-border-color);
    --code-bubble-button-fg-color: inherit;
    --code-bubble-copy-button-bg-color: inherit;
    --code-bubble-copy-button-border-color: var(--code-bubble-border-color);
    --code-bubble-copy-button-fg-color: inherit;

    /** Hover */
    --code-bubble-button-hover-bg-color: rgb(237 237 237);
    --code-bubble-button-hover-border-color: rgb(135 135 135);
    --code-bubble-button-hover-fg-color: inherit;
    --code-bubble-copy-button-hover-bg-color: rgb(237 237 237);
    --code-bubble-copy-button-hover-border-color: rgb(135 135 135);
    --code-bubble-copy-button-hover-fg-color: inherit;

    /** Focus */
    --code-bubble-button-focus-bg-color: inherit;
    --code-bubble-button-focus-border-color: inherit;
    --code-bubble-button-focus-fg-color: inherit;
    --code-bubble-copy-button-focus-bg-color: inherit;
    --code-bubble-copy-button-focus-border-color: inherit;
    --code-bubble-copy-button-focus-fg-color: inherit;

    /** Active */
    --code-bubble-button-active-bg-color: inherit;
    --code-bubble-button-active-border-color: rgb(135 135 135);
    --code-bubble-button-active-fg-color: inherit;
    --code-bubble-button-active-font-weight: bold;
    --code-bubble-copy-button-active-bg-color: inherit;
    --code-bubble-copy-button-active-border-color: rgb(135 135 135);
    --code-bubble-copy-button-active-fg-color: inherit;

    display: block;
    opacity: 0;
  }

  :host([code-bubble]) {
    opacity: 1;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  *:focus-visible {
    outline: var(--code-bubble-outline);
    outline-offset: var(--code-bubble-outline-offset);
  }

  button {
    cursor: pointer;
  }

  .preview {
    border: solid var(--code-bubble-border-width)
      var(--code-bubble-border-color);
    border-top-left-radius: var(--code-bubble-border-radius);
    border-top-right-radius: var(--code-bubble-border-radius);
    position: relative;
  }

  .resizable {
    padding: var(--code-bubble-preview-padding);
    position: relative;
    border-bottom: none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    min-width: 10rem;
    max-width: 100%;
    padding: 1.5rem 3.25rem 1.5rem 1.5rem;
  }

  .resize-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1rem;
    font-size: 20px;
    cursor: grab;
    border: none;
    border-inline: solid var(--code-bubble-border-width) var(--code-bubble-border-color);
    border-start-end-radius: var(--code-bubble-border-radius);
    background-color: var(--code-bubble-button-bg-color);
    margin-inline-end: calc(var(--code-bubble-border-width) * -1);
  }

  .resize-handle:hover {
    background-color: var(--code-bubble-button-hover-bg-color);
  }

  .resize-handle:active {
    background-color: var(--code-bubble-button-active-bg-color);
  }

  .dragging:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: grabbing;
  }

  .code-bubble {
    margin: 0;
    border-inline: solid var(--code-bubble-border-width)
      var(--code-bubble-border-color);
    position: relative;
  }

  .code-bubble summary {
    display: none;
  }

  .copy-code-button {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    margin: 1rem;
    font-weight: (--code-bubble-copy-button-font-weight);
    padding: var(--code-bubble-copy-button-padding-y)
      var(--code-bubble-copy-button-padding-x);
    background-color: (--code-bubble-copy-button-bg-color);
    border-color: var(--code-bubble-copy-button-border-color);
    color: var(--code-bubble-copy-button-fg-color);
    border-radius: var(--code-bubble-border-radius);
  }

  *::slotted(pre) {
    margin: 0;
    padding: var(--code-bubble-snippet-padding);
    background-color: rgb(249, 249, 249);
  }

  .controls {
    display: flex;
    position: relative;
    border-bottom-left-radius: var(--code-bubble-border-radius);
    border-bottom-right-radius: var(--code-bubble-border-radius);
    display: flex;
    margin-top: calc(var(--code-bubble-border-width) * -1);
  }

  .controls button {
    font-weight: var(--code-bubble-button-font-weight);
    padding: var(--code-bubble-button-padding-y)
      var(--code-bubble-button-padding-x);
    background-color: var(--code-bubble-button-bg-color);
    color: var(--code-bubble-button-fg-color);
    border: solid 1px var(--code-bubble-button-border-color);
    display: flex;
    gap: var(--code-bubble-button-icon-gap);
    align-items: center;
    justify-content: center;
  }

  .controls button svg {
    height: 1em;
    width: 1em;
  }

  .controls button:has(.visually-hidden) {
    --code-bubble-button-icon-gap: 0px;
  }

  .controls button:focus-visible {
    z-index: 1;
  }

  .controls button[aria-pressed='true'] {
    background-color: var(--code-bubble-button-active-bg-color);
    color: var(--code-bubble-button-active-fg-color);
    font-weight: var(--code-bubble-button-active-font-weight);
  }

  .controls button:hover {
    background-color: var(--code-bubble-button-hover-bg-color);
    color: var(--code-bubble-button-hover-fg-color);
    outline: solid var(--code-bubble-border-width)
      var(--code-bubble-button-hover-border-color);
    outline-offset: calc(var(--code-bubble-border-width) * -2);
  }

  .controls button:not(:last-of-type) {
    border-right: solid 1px var(--code-bubble-button-border-color);
  }

  .controls button:first-of-type {
    flex: 1 1 auto;
    border-bottom-left-radius: var(--code-bubble-border-radius);
  }

  .controls button:last-of-type {
    border-bottom-right-radius: var(--code-bubble-border-radius);
  }

  .controls button:not(:first-of-type) {
    margin-inline-start: calc(var(--code-bubble-border-width) * -1);
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;