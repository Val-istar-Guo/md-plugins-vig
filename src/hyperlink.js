import { Group, Node, TextN } from 'md-core/nodes';


export default () => ({
  name: 'hyperlink',
  input: 'inline',
  parse: vel => {
    const str = vel.children[0];
    const patt = /\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)\s*(?:(["'])(\S*?)\3)?\)/g;
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

      if (next.index) {
        const inline = str.substring(lastIndex, next.index);
        group.push(new TextN('inline', inline));
      }

      console.log(next);
      const [, text, href, , title] = next;
      const inline$ = new TextN('inline', text);
      const hyperlink$ = new Node('a', { href, title }, [inline$]);
      group.push(hyperlink$);
    }

    if (!group.length) return vel;
    else if (group.length > 1) return new Group(group);
    return group[0];
  },
});
