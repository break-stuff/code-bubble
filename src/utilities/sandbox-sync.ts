import CodeBlock from '../components/code-block/code-block';

declare global {
  interface WindowEventMap {
    'example-change': CustomEvent;
  }
}

export function syncSandboxes() {
  window.addEventListener('example-change', (e: CustomEvent) => {
    document.querySelectorAll<CodeBlock>('[code-block]').forEach(y => {
      y.example = e.detail;
    });
  });
}
