export function formatCode(template: string = '', code: string = '') {
  if (!code) {
    return template;
  }

  if (!template) {
    return code;
  }

  return template
    .split('\n')
    .map(line =>
      !line.includes('%example%')
        ? line
        : code
            .split('\n')
            .map(c => line.replace('%example%', c))
            .join('\n'),
    )
    .join('\n');
}
