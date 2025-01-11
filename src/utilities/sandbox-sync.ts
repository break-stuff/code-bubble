import type CodeBubble from '../components/code-bubble/code-bubble.js';

declare global {
  interface WindowEventMap {
    'framework-change': CustomEvent;
  }
}

export function syncSandboxes() {
  window.addEventListener('framework-change', (e: CustomEvent) => {
    document
      .querySelectorAll<CodeBubble>(
        (e.target as HTMLElement).tagName.toLowerCase(),
      )
      .forEach(y => {
        y.framework = e.detail;
      });
  });
}
