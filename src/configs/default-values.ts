import type {
  CodeBubbleConfig,
  ComponentConfig,
  CodePen,
  FrameworkConfig,
  StackBlitz,
} from './types.js';

const componentConfig: ComponentConfig = {
  tagName: 'code-bubble',
  showCode: false,
  showCodeButton: {
    closedLabel: 'Show Code',
    openedLabel: 'Hide Code',
    closedIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"/></svg>',
    openedIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m4 15l8-8l8 8l-2 2l-6-6l-6 6z"/></svg>',
    hide: false,
  },
  copyCodeButton: {
    label: 'Copy Code',
    copiedLabel: 'Copied',
  },
  rtlButton: {
    label: 'RTL',
  },
  sandboxButton: {
    label: 'Sandbox',
  },
  frameworkButtons: {
    label: (framework: string) => framework,
  },
};

const codePenDefaultConfig: FrameworkConfig<CodePen> = {
  html: {
    project: {
      title: 'HTML Example',
      description: 'Example of using the code in HTML.',
      private: false,
      tags: ['html', 'example'],
      editors: '111',
      layout: 'top',
      html: '<div>HTML here.</div>',
      css: `body { 
  font: 16px sans-serif; 
  padding: 1rem; 
}`,
      js: ``,
    },
    exampleTemplate: {
      fileName: 'html',
      template: '',
    },
  },
  jsx: {
    project: {
      title: 'React Example',
      description: 'Example of using the code in React.',
      private: false,
      tags: ['react', 'example'],
      editors: '111',
      layout: 'top',
      html: '<div id="root"></div>',
      css: `body { 
  font: 16px sans-serif; 
  padding: 1rem; 
}`,
      js: `import React from 'react'; 
import ReactDOM from 'react-dom'; 
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));`,
      js_pre_processor: 'babel',
      js_external:
        'https://esm.sh/react@18.2.0;https://esm.sh/react-dom@latest',
    },
    exampleTemplate: {
      fileName: 'js',
      template: `import React from 'https://esm.sh/react@latest';
import ReactDOM from 'https://esm.sh/react-dom@latest';

const App = () => (
  <>
    %example%
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
`,
    },
  },
};

export const defaultHTMLConfig: FrameworkConfig<StackBlitz>['html'] = {
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
    template: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app">
      %example%
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>`,
  },
};

export const defaultReactConfig: FrameworkConfig<StackBlitz>['react'] = {
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
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React code example</title>
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
    template: `export default () => {
  return (
    <>
      %example%
    </>
  );
};`,
  },
};

const stackBlitzDefaultConfig: FrameworkConfig<StackBlitz> = {
  html: defaultHTMLConfig,
  jsx: defaultReactConfig,
};

export const defaultCodeBubbleConfig: CodeBubbleConfig = {
  component: componentConfig,
  sandbox: 'codepen',
  sandboxConfig: {
    codePen: codePenDefaultConfig,
    stackBlitz: stackBlitzDefaultConfig,
  },
};
