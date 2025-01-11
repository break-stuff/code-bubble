import sdk from '@stackblitz/sdk';
import { formatCode } from "./format-code.js";
import type { CodePen, ProjectConfig, StackBlitz } from "../configs/types.js";

export function useCodePenSandbox(config: ProjectConfig<CodePen>, example = '') {
  const sandboxConfig = {
    ...config.project,
    [config.exampleTemplate!.fileName]: formatCode(
      config.exampleTemplate!.template,
      example,
    ),
  };

  const form = document.createElement('form');
  form.action = 'https://codepen.io/pen/define';
  form.method = 'POST';
  form.target = '_blank';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'data';
  input.value = JSON.stringify(sandboxConfig);
  form.append(input);

  document.documentElement.append(form);
  form.submit();
  form.remove();
}

export function useStackBlitzSandbox(config: ProjectConfig<StackBlitz>, example = '') {
  const templateFile = config?.exampleTemplate?.fileName || 'index.html';

  sdk.openProject(
    {
      title: config.project?.title || 'Example',
      description:
        config.project?.description ||
        'Blank starter project for building ES6 apps.',
      template: 'node',
      files: {
        ...config!.project!.files,
        [templateFile]: formatCode(
          config?.exampleTemplate?.template,
          example,
        ),
      },
      settings: {
        compile: {
          trigger: 'auto',
          clearConsole: true,
        },
      },
    },
    {
      newWindow: true,
      openFile: [templateFile],
    },
  );
}
