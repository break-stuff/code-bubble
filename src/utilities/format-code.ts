import { format } from 'prettier/standalone';
import htmlPlugin from 'prettier/plugins/html';
import typescriptPlugin from 'prettier/plugins/typescript';
import estreePlugin from 'prettier/plugins/estree';

export async function formatCode(code: string, exampleType: string) {
  return await format(
    code,
    {
      parser: exampleType === 'html' ? 'html' : 'typescript',
      plugins: [htmlPlugin, typescriptPlugin, estreePlugin],
    },
  )
}

