import { nodes } from 'md-core';


const { Group, Node, TextN, TempN } = nodes;

export default () => ({
  name: 'code',
  input: 'blocks',
  parse: vel => {
    const str = vel.children[0];
    // const patt = /^(?:(?: {0,3}\t| {4}).*(?:\n|$))+/mg;
    const patt = /^(`{3,})(.*)\n((?:.*\n)*)\1/mg;
    const group = [];

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          const blocks = str.substr(lastIndex);
          group.push(new TempN('blocks', [blocks]));
        }
        break;
      }

      if (next.index !== lastIndex) {
        const blocks = str.substring(lastIndex, next.index);
        group.push(new TempN('blocks', [blocks]));
      }

      const [, , lang, code] = next;
      const code$ = new Node('code', { class: lang }, [code]);
      const pre$ = new Node('pre', [code$]);
      group.push(pre$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
});
