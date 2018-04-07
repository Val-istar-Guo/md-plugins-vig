import { nodes, middleware } from 'md-core';
import { inline } from './nodes';


const { html, isChild } = nodes;

export default middleware({
  name: 'html',
  input: 'inline',
  parse: node => {
    const text = node.text;

    const nodes = html(text, true, true);
    if (isChild(nodes[0])) {
      return [ nodes[0], inline(nodes[1]) ]
    }

    return node;
  },
});

