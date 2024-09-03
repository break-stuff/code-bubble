import { CodeBlock } from '../../configs';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import CodeBubble from './code-bubble';

const codeBlock = new CodeBlock();

async function getCodeBubble() {
  return await fixture<CodeBubble>(
    html`<code-bubble>
      <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
&lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
&lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
</code></pre>
      <pre><code class="language-jsx">export default () =&gt; {
  return (
    &lt;&gt;
      &lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
      &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
      &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    &lt;/&gt;
    );
};
</code></pre>
    </code-bubble>`,
  );
}

describe('CodeBlock', () => {
  it('should set the language', async () => {
    const codeBubble = await getCodeBubble();
    codeBlock.setLanguage('jsx');
    expect(codeBubble.framework).to.equal('jsx');
  });

  describe('tag name', () => {
    it('should create custom element with the tag name "test-bubble"', async () => {
      new CodeBlock({
        component: { tagName: 'test-bubble' },
      });

      expect(customElements.get('test-bubble')).to.not.be.undefined;
    });
  });
});

describe('CodeBubble', () => {
  it('should be accessible in its default state', async () => {
    const codeBubble = await getCodeBubble();

    await expect(codeBubble).to.be.accessible();
  });

  describe('show code button', () => {
    it('should show the code when the "show code" button is clicked', async () => {
      const codeBubble = await getCodeBubble();

      const showCodeButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.show-code-button',
        );
      const codeBlock =
        codeBubble.shadowRoot?.querySelector<HTMLDetailsElement>(
          '.code-bubble',
        );
      expect(showCodeButton?.innerText).to.equal('Show Code');

      showCodeButton?.click();
      await elementUpdated(codeBubble);

      expect(codeBlock?.open).to.be.true;
      expect(showCodeButton?.innerText).to.equal('Hide Code');
      await expect(codeBubble).to.be.accessible();
    });

    it('should hide the show code button', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({ component: { hideShowCodeButton: true } });
      const showCodeButton =
        codeBubble.shadowRoot?.querySelector('.show-code-button');

      expect(showCodeButton).to.be.null;
      codeBlock.updateConfig({ component: { hideShowCodeButton: false } });
    });

    it('should update the "show code button" label', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({
        component: { showCodeButtonLabel: 'Test Label' },
      });
      const showCodeButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.show-code-button',
        );

      expect(showCodeButton?.innerText).to.equal('Test Label');
    });

    it('should execute the "onShowCode" callback', async () => {
      const codeBubble = await getCodeBubble();
      let showCode = false;

      codeBlock.updateConfig({
        hooks: {
          onShowCode: (isShowCode: boolean) => {
            showCode = isShowCode;
          },
        },
      });
      const showCodeButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.show-code-button',
        );
      showCodeButton?.click();
      await elementUpdated(codeBubble);

      expect(showCode).to.be.true;
    });
  });

  describe('copy code button', () => {
    // skipping tests until permissions can be configured
    it.skip('should copy the code when the "copy code" button is clicked', async () => {
      const codeBubble = await getCodeBubble();

      const copyCodeButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.copy-code-button',
        );
      const codeBlock =
        codeBubble.shadowRoot?.querySelector<HTMLDetailsElement>(
          '.code-bubble',
        );
      copyCodeButton?.click();
      await elementUpdated(codeBubble);

      expect(codeBlock?.open).to.be.true;
      await expect(codeBubble).to.be.accessible();
    });

    it('should hide the copy code button', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({ component: { hideCopyCodeButton: true } });
      const copyCodeButton =
        codeBubble.shadowRoot?.querySelector('.copy-code-button');

      expect(copyCodeButton).to.be.null;
      codeBlock.updateConfig({ component: { hideCopyCodeButton: false } });
    });

    it.skip('should update the "copy code button" label', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({
        component: { copyCodeButtonLabel: 'Test Label' },
      });
      await elementUpdated(codeBubble);
      const copyCodeButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.copy-code-button',
        );

      copyCodeButton?.click();
      await elementUpdated(codeBubble);

      expect(copyCodeButton?.innerText).to.equal('Test Label');
    });

    it.skip('should update the "copy code button copied" label', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({
        component: { copyCodeButtonCopiedLabel: 'Test Copied Label' },
      });
      const copyCodeButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.copy-code-button',
        );
      copyCodeButton?.click();
      await elementUpdated(codeBubble);

      expect(copyCodeButton?.innerText).to.equal('Test Copied Label');
    });

    it.skip('should execute the "onCopy" callback', async () => {
      const codeBubble = await getCodeBubble();
      let copied = false;

      codeBlock.updateConfig({
        hooks: {
          onCopy: () => {
            copied = true;
          },
        },
      });
      const copyCodeButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.copy-code-button',
        );
      copyCodeButton?.click();
      await elementUpdated(codeBubble);

      expect(copied).to.be.true;
    });
  });

  describe('RTL button', () => {
    it('should hide the RTL button', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({ component: { hideRtlButton: true } });
      const rtlButton = codeBubble.shadowRoot?.querySelector('.rtl-button');

      expect(rtlButton).to.be.null;
      codeBlock.updateConfig({ component: { hideRtlButton: false } });
    });

    it('should update the "RTL button" label', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({
        component: { rtlButtonLabel: 'Test Label' },
      });
      const rtlButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>('.rtl-button');

      expect(rtlButton?.innerText).to.equal('Test Label');
    });

    it('should execute the "onRtl" callback', async () => {
      const codeBubble = await getCodeBubble();
      let isRtl = false;

      codeBlock.updateConfig({
        hooks: {
          onRtl: (rtl: boolean) => {
            isRtl = rtl;
          },
        },
      });
      const rtlButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>('.rtl-button');
      rtlButton?.click();
      await elementUpdated(codeBubble);

      expect(isRtl).to.be.true;
    });
  });

  describe('sandbox button', () => {
    it('should hide the sandbox button', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({ component: { hideSandboxButton: true } });
      const sandboxButton =
        codeBubble.shadowRoot?.querySelector('.sandbox-button');

      expect(sandboxButton).to.be.null;
      codeBlock.updateConfig({ component: { hideSandboxButton: false } });
    });

    it('should update the "sandbox button" label', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({
        component: { sandboxButtonLabel: 'Test Label' },
      });
      const sandboxButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.sandbox-button',
        );

      expect(sandboxButton?.innerText).to.equal('Test Label');
    });

    it('should execute the "onSandboxOpen" callback', async () => {
      const codeBubble = await getCodeBubble();
      let sandboxOpened = false;

      codeBlock.updateConfig({
        hooks: {
          onSandboxOpen: () => {
            sandboxOpened = true;
          },
        },
      });
      const sandboxButton =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.sandbox-button',
        );
      sandboxButton?.click();
      await elementUpdated(codeBubble);

      expect(sandboxOpened).to.be.true;
    });
  });

  describe('framework buttons', () => {
    it('should hide the framework buttons', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({ component: { hideFrameworkButtons: true } });
      const frameworkButtons =
        codeBubble.shadowRoot?.querySelector('.framework-button');

      expect(frameworkButtons).to.be.null;
      codeBlock.updateConfig({ component: { hideFrameworkButtons: false } });
    });

    it('should hide the framework buttons when only one example is provided', async () => {
      const codeBubble = await fixture<CodeBubble>(
        html`<code-bubble>
          <pre><code class="language-html">&lt;button appearance=&quot;accent&quot;&gt;Accent&lt;/button&gt;
    &lt;button appearance=&quot;neutral&quot;&gt;Neutral&lt;/button&gt;
    &lt;button appearance=&quot;lightweight&quot;&gt;Lightweight&lt;/button&gt;
    </code></pre>
        </code-bubble>`,
      );

      const frameworkButtons =
        codeBubble.shadowRoot?.querySelector('.framework-button');

      expect(frameworkButtons).to.be.null;
    });

    it('should update the "framework button" label', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({
        component: {
          frameworkButtonLabel: (framework: string) =>
            `Test Label ${framework}`,
        },
      });
      const frameworkButtons =
        codeBubble.shadowRoot?.querySelector<HTMLButtonElement>(
          '.framework-button',
        );

      expect(frameworkButtons?.innerText).to.equal('Test Label html');
      codeBlock.updateConfig({
        component: {
          frameworkButtonLabel: (framework: string) => framework,
        },
      });
    });

    it('should execute the "onLanguageChange" callback', async () => {
      const codeBubble = await getCodeBubble();
      let language = '';

      codeBlock.updateConfig({
        hooks: {
          onLanguageChange: (lang: string) => {
            language = lang;
          },
        },
      });

      const frameworkButtons = [
        ...codeBubble.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          '.framework-button',
        ),
      ];
      frameworkButtons[1]?.click();
      await elementUpdated(codeBubble);

      expect(language).to.equal('jsx');
    });
  });

  describe('preview', () => {
    it('should hide the preview', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({ component: { hidePreview: true } });
      const preview = codeBubble.shadowRoot?.querySelector('.preview');

      expect(preview).to.be.null;
      codeBlock.updateConfig({ component: { hidePreview: false } });
    });
  });

  describe('default example', () => {
    it('should show the default example', async () => {
      const codeBubble = await getCodeBubble();

      codeBlock.updateConfig({ component: { defaultExample: 'jsx' } });
      const frameworkButton =
        codeBubble.shadowRoot?.querySelector<HTMLDetailsElement>(
          '.framework-button[aria-pressed="true"]',
        );

      expect(frameworkButton?.innerText).to.equal('jsx');
      codeBlock.updateConfig({ component: { defaultExample: 'html' } });
    });
  });
});
