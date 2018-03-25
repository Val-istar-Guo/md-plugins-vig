import { nodes } from 'md-core';
import splitInline from './utils/splitInline';
import { inline } from './nodes';


const { html, isChild } = nodes;

export default () => ({
  name: 'html',
  input: 'inline',
  parse: node => {
    const text = node.text;

    const nodes = html(text);

    if (nodes.some(isChild)) {
      nodes.map(child => {
        if (typeof child === 'string') return inline(child)
        return child
      })
    }

    return node;
  },
});

