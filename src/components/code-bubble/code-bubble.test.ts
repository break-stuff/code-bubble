import { CodeBlock, CodeBubbleConfig } from '../../configs';
import { expect, fixture, html } from '@open-wc/testing';
import CodeBubble from './code-bubble';

async function getCodeBubble(config?: CodeBubbleConfig) {
  const codeBlock = new CodeBlock(config);

  const codeBubble = await fixture<CodeBubble>(
    html`<code-bubble>
      <pre><code>&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;

&lt;script&gt;
  alert('Hello, World!');
&lt;/script&gt;
</code></pre>
    </code-bubble>`,
  );

  return { codeBlock, codeBubble };
}

describe('CodeBubble', () => {
  describe('CodeBlock', () => {
    it('should set the language', async () => {
      const { codeBlock, codeBubble } = await getCodeBubble();
      codeBlock.setLanguage('html');
      expect(codeBubble.framework).to.equal('html');
    });
  });

  describe('CodeBubble', () => {
    it('should render the code block', async () => {
      const { codeBubble } = await getCodeBubble();

      expect(codeBubble).to.be.accessible();
    });
  });
});
