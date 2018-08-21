import { middleware, combine } from 'md-core/utils'
import { version } from '../package.json';
import { block, text } from './nodes'
import normalize from './normilize'
import paragraph from './paragraph'


const splitTr = str => str
  .replace(/(^\s*\|?\s*)|(\s*\|?\s*$)/g, "")
  .split(/\s*\|\s*/)


const parseAlign = (maxL,aligns) => {
  const arr = new Array(maxL)
  arr.fill('left')

  aligns.reduce((arr, align, i) => {
    if (/^:.*:$/.test(align)) arr[i] = 'center'
    else if (align.charAt(align.length) === ':') arr[i] = 'right'
    else arr[i] = 'left'

    return arr
  }, arr)

  return arr
}

const fillTr = (maxL, autoFill, tr) => {
  const len = tr.length;
  if (maxL > len) {
    const empty = new Array(maxL - len)
    empty.fill(autoFill);
    tr.push(...empty);
  }

  return tr;
}

const parseTd = (align, content) => ({ tagName: 'td', align, content })
const parseTBody = (aligns, maxL, lines, autoFill) => {
  return lines
    .map(line => {
      return fillTr(maxL, autoFill, line)
        .map((td, i) => parseTd(aligns[i], td))
    })
};

const parseTh = (align, content) => ({ tagName: 'th', align, content })
const parseTHead = (aligns, maxL, line, autoFill) => {
  return fillTr(maxL, autoFill, line)
    .map((th, i) => parseTh(aligns[i], th))
};


const tableCreator = node => (thead, tbody) => ({
  ...node('table'),
  thead,
  tbody,
  parse(h) {
    const { thead, tbody } = this

    const thead$ = h('thead', {}, [
      h('tr', {}, thead.map(({ align, content }) =>
        h('th', { class: align, style: `text-align: ${align}` }, [content])
      ))
    ])

    const tbody$ = h('tbody', {}, tbody.map(tr =>
      h('tr', {}, tr.map(({ align, content }) =>
        h('td', { class: align, style: `text-align: ${align}` }, [content])
      ))
    ))

    return h('table', {}, [thead$, tbody$])
  }
})

const table = middleware({
  version,
  name: 'table',
  input: 'block',
  parse: ({ lexical }, node, option = {}) => {
    const patt = /(^|\n)( {0,3}(\|?)(.*?\|)+(.*)?)\n( {0,3}(\|\s*)?((:\s*)?-[-\s]*(:\s*)?\|\s*)*((:\s*)?-[-\s]*(:\s*)?(\|\s*)?))\n( {0,3}(\|?)(.*?\|)+(.*)?(\n|$))*/g;
    const { autoFill = '' } = option;

    return lexical.match(patt, block(node), matched => {
      let lines = matched[0]
        .replace(/(^\n)|(\n$)/g, "")
        .split('\n')
        .map(splitTr);

      const maxL = Math.max(...lines.map(line => line.length));
      const [theadString, alignString, ...tbodyString] = lines;
      const aligns = parseAlign(maxL, alignString);
      const tbody = parseTBody(aligns, maxL, tbodyString, autoFill);
      const thead = parseTHead(aligns, maxL, theadString);

      return tableCreator(node)(thead, tbody)
    })
  },
});

export default combine(normalize, table, paragraph);
