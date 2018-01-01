import { nodes } from 'md-core';


const { Group, Node, TextN } = nodes;

const className = {
  '**': 'asterisk',
  '__': 'underline',
};

export default () => ({
  name: 'inlineCode',
  input: 'inline',
  parse: vel => {
    const str = vel.children[0];
    const patt = /([*_]{2})(.*?)\1/g;
    const group = [];

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          const inline = str.substr(lastIndex);
          group.push(new TextN('inline', inline));
        }
        break;
      }

      if (next.index !== lastIndex) {
        const inline = str.substring(lastIndex, next.index);
        group.push(new TextN('inline', inline));
      }

      const [, mark, strong] = next;
      const strong$ = new Node('strong', { class: className[mark] }, [strong]);
      group.push(strong$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
});
