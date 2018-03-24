import { nodes } from 'md-core';
import { block } from './nodes';


const { TempN } = nodes;

export default () => ({
  name: 'normalize',
  input: 'source',
  parse: node => {
    const content = node.text
      .replace(/^\s*\n/, "")
      .replace(/\s*$/, "");

    return block(content);
  }
});
