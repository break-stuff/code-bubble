import { mergeDeep } from '../utilities/deep-merge';
import { formatCode } from '../utilities/format-code';
import { componentConfig, ComponentConfig } from './component-config';
import { CodePen, FrameworkConfig } from './sandbox-configs.js';


export const codePenDefaultConfig: FrameworkConfig<CodePen> = {
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
  react: {
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
