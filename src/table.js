import { nodes, middleware } from 'md-core';
import splitBlock from './utils/splitBlock';
import { inline } from './nodes';


const { vnode } = nodes;

const splitTr = str => str
  .replace(/(^\s*\|?\s*)|(\s*\|?\s*$)/g, "")
  .split(/\s*\|\s*/)

// aligns
const LEFT = 1;
const CENTER = 2;
const RIGHT = 3;

const alignClassEnum = {
  [LEFT]: 'left',
  [CENTER]: 'center',
  [RIGHT]: 'right',
};

const alignStyleEnum = {
  [LEFT]: 'text-align: left',
  [CENTER]: 'text-align: center',
  [RIGHT]: 'text-align: right',
};

const parseAlign = (maxL,aligns) => {
  const arr = new Array(maxL);
  arr.fill(LEFT);

  aligns.reduce((arr, align, i) => {
    if (/^:.*:$/.test(align)) arr[i] = CENTER;
    else if (align.charAt(0) === ':') arr[i] = LEFT;
    else arr[i] = RIGHT;

    return arr;
  }, arr);

  return arr;
}

const fillTr = (maxL,line) => {
  const len = line.length;
  if (maxL > len) {
    const empty = new Array(maxL - len);
    empty.fill('');
    line.push(empty);
  }

  return line;
}

const parseTr = (aligns, maxL, childTag = 'td') => tr => {
  const children$ = fillTr(maxL, tr)
    .map((child, i) => {
      const inline$ = inline(child);
      return vnode(childTag, {
        class: alignClassEnum[aligns[i]],
        style: alignStyleEnum[aligns[i]],
      }, [inline$]);
    });

  return vnode('tr', children$);
}

const parseTBody = (aligns, maxL, lines) => {
  const tbody = lines
    .map(parseTr(aligns, maxL, 'td'))

  return vnode('tbody', tbody);
};

const parseTHead = (aligns, maxL, line) => {
  const tr$ = parseTr(aligns, maxL, 'th')(line);

  return vnode('thead', [tr$]);
};


export default middleware({
  name: 'table',
  input: 'block',
  parse: node => {
    const patt = /(^|\n)( {0,3}(\|?)(.*?\|)+(.*)?)\n( {0,3}(\|\s*)?((:\s*)?-[-\s]*(:\s*)?\|\s*)*((:\s*)?-[-\s]*(:\s*)?(\|\s*)?))\n( {0,3}(\|?)(.*?\|)+(.*)?(\n|$))*/g;
    const group = splitBlock(node, patt, matched => {
      let lines = matched[0]
        .replace(/(^\n)|(\n$)/g, "")
        .split('\n')
        .map(splitTr);

      const maxL = Math.max(...lines.map(line => line.length));
      const [thead, align, ...tbody] = lines;
      const aligns = parseAlign(maxL, align);
      const tbody$ = parseTBody(aligns, maxL, tbody);
      const thead$ = parseTHead(aligns, maxL, thead);

      const table$ = vnode('table', [thead$, tbody$]);
      return table$;
    })

    if (group.length) return group;
    return node;
  },
});
