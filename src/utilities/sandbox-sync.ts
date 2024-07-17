import CodeBubble from '../components/code-bubble/code-bubble';

declare global {
  interface WindowEventMap {
    'example-change': CustomEvent;
  }
}

export function syncSandboxes() {
  window.addEventListener('example-change', (e: CustomEvent) => {
    document.querySelectorAll<CodeBubble>('[code-bubble]').forEach(y => {
      y.framework = e.detail;
    });
  });
}
