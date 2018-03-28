import { nodes, middleware } from 'md-core';
import splitBlock from './utils/splitBlock';


const { vnode } = nodes;

const className = {
  '-': 'dash',
  '_': 'underline',
  '*': 'asterisk',
}

// const pattern = /^(?:([\s\S]*?)\n)?[ \t]*(([-_*])(?:[ \t]*\3){2,})[ \t]*(?:\n|$)([\s\S]*$)/;
export default middleware({
  name: 'hr',
  input: 'block',
  parse: node => {
    const patt = /^[ \t]*(([-_*])(?:[ \t]*\2){2,})[ \t]*(?:\n|$)/mg;
    const group = splitBlock(node, patt, matched => (
      vnode('hr', { class: className[matched[2]] })
    ));

    if (group.length) return group;
    return node;
  },
});
