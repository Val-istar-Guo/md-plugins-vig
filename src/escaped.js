import { nodes, middleware } from 'md-core';
import splitInline from './utils/splitInline';


const { vtext } = nodes;

// Only esacape: \ ` * _ { } [ ] ( ) # * + - . !
export default middleware({
  name: 'escaped',
  input: 'inline',
  parse: node => {
    const patt = /\\([\\`\*_{}\[\]()#\+.!\-])/g;
    const group = splitInline(node, patt, matched =>
      vtext(matched[1]).nameAs('escaped')
    );

    if (group.length) return group;
    return node;
  },
});
