import sdk from '@stackblitz/sdk';
import { formatCode } from '../utilities/format-code';
import { componentConfig, ComponentConfig } from './component-config';
import { mergeDeep } from '../utilities/deep-merge';

export type SbSandboxConfig = {
  title?: string;
  description?: string;
  /**
   * Provide project files, as code strings.
   *
   * Binary files and blobs are not supported.
   */
  files?: {
    [name: string]: string;
  };
};

export type StackBlitzProjectConfig = {
  html?: ProjectConfig;
  react?: ProjectConfig;
};

export type ProjectConfig = {
  project?: SbSandboxConfig;
  exampleTemplate: ExampleTemplateConfig;
};

export type ExampleTemplateConfig = {
  fileName: string;
  template: (example: string) => string;
};

export type StackBlitzConfig = {
  component?: ComponentConfig;
  sandbox?: StackBlitzProjectConfig;
}

export const defaultHTMLConfig: StackBlitzProjectConfig['html'] = {
  project: {
    title: 'HTML Example',
    description: 'Example of using the code in HTML.',
    files: {
      'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>`,
      'main.js': `import './styles.css';`,
      'styles.css': `body {
  font: 16px sans-serif;
  padding: 1rem;
}`,
      'package.json': `{
  "name": "vite-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.3.2"
  }
}`,
    },
  },
  exampleTemplate: {
    fileName: 'index.html',
    template: example => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app">
      ${example}
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>`,
  },
};

export const defaultReactConfig: StackBlitzProjectConfig['react'] = {
  project: {
    title: 'React Example',
    description: 'Example of using the code in React.',
    files: {
      'src/App.tsx': `export default () => {
  return (
    <h1>Hello, World!</h1>
  );
};
      `,
      'src/index.tsx': `import { render } from "react-dom";
import App from "./App";
import './styles.css';

const rootElement = document.getElementById("root");
render(<App />, rootElement);
      `,
      'src/styles.css': `body {
  font: 16px sans-serif;
  padding: 1rem;
}
        `,
      'index.html': `<!DOCTYPE html>
<html lang="en" class="he-theme-light">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Harmony + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`,
      'package.json': `{
  "name": "react-sandbox",
  "version": "1.0.0",
  "main": "src/index.tsx",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.15.0",
    "@typescript-eslint/parser": "^7.15.0",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "typescript": "^5.2.2",
    "vite": "^5.3.2"
  }
}
`,
      'tsconfig.json': `{
  "include": ["./src/**/*"],
  "compilerOptions": {
    "strict": false,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "baseUrl": "."
  }
}`,
      'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})`,
    },
  },
  exampleTemplate: {
    fileName: 'src/App.tsx',
    template: example => `export default () => {
  return (
    <>
      ${example}
    </>
  );
};`,
  },
};

const sandboxOptions: StackBlitzProjectConfig = {
  html: defaultHTMLConfig,
  react: defaultReactConfig,
};

export let configuration: StackBlitzConfig = {
  component: componentConfig,
  sandbox: sandboxOptions
}

export function updateStackBlitzConfig(userConfig?: StackBlitzConfig) {
  configuration = mergeDeep(configuration as never, userConfig as never);
}

export async function useStackBlitzSandbox(example = '', exampleType = 'html') {
  const config = configuration.sandbox![exampleType as keyof StackBlitzProjectConfig];
  if (!config) {
    throw new Error(`Invalid example type: ${exampleType}`);
  }

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
        [templateFile]: await formatCode(
          config?.exampleTemplate?.template(example) || example,
          exampleType,
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
