import { nodes, middleware } from 'md-core';
import { inline, block } from './nodes';
import splitBlock from './utils/splitBlock';


const { vnode } = nodes;

const parseList = lines => {
  const patt = /^ {0,3}([*+-]|\d+\.)(( +)(.*)((\n *[^*+-\s].*)|(\n\n? \3.*))*)/mg
  const list = [];

  while (true) {
    const next = patt.exec(lines);
    if (!next) break;

    let [, prefix, content] = next;
    let li$;
    content = content.replace(/^ {0,4}/mg, '');

    if (/\n/.test(content)) {
      li$ = vnode('li', [block(content)]);
    } else {
      const inline$ =
      li$ = vnode('li', [inline(content)]);
    }

    list.push(li$);
  }

  return list;
};


export default middleware({
  name: 'list',
  input: 'block',
  parse: node => {
    const patt = /^( {0,3}([*+-]|\d+\.)( +)(.*)((\n *[^*+-\s].*)|(\n\n? \3.*))*(?:\n|$))+/mg
    const group = splitBlock(node, patt, matched => {
      const [list, prefix] = matched;
      const items = parseList(list);
      let list$;

      if (/[*+-]/.test(prefix)) list$ = vnode('ul', items);
      else list$ = vnode('ol', items);

      return list$;
    });

    if (group.length) return group;
    return node;
  },
});
