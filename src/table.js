import { middleware, combine } from 'md-core/utils'
import { version } from '../package.json';
import { block, inline } from './nodes'
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


const thAstNode = node => ({ align, content }) => ({
  ...node('th', [inline(node)(content)]),
  align,
  parse(h) {
    const { children } = this
    return h('th', { class: align, style: `text-align: ${align}` }, children.map(child => child.parse(h)))
  }
})

const theadAstNode = node => (thead) => ({
  ...node('thead', thead.map(thAstNode(node))),
  parse(h) {
    const { children } = this;
    return h('thead', {}, [
      h('tr', {}, children.map(child => child.parse(h)))
    ])
  }
})

const tdAstNode = node => ({ align, content }) => ({
  ...node('td', [inline(node)(content)]),
  align,
  parse(h) {
    const { children } = this
    return h('td', { class: align, style: `text-align: ${align}` }, children.map(child => child.parse(h)))
  }
})

const trAstNode = node => tr => ({
  ...node('tr', tr.map(tdAstNode(node))),
  parse(h) {
    const { children } = this
    return h('tr', {}, children.map(child => child.parse(h)))
  }
})

const tbodyAstNode = node => tbody => ({
  ...node('tbody', tbody.map(trAstNode(node))),
  parse(h) {
    const { children } = this
    return h('tbody', {}, children.map(child => child.parse(h)))
  }
})

const tableAstNode = node => (thead, tbody) => ({
  ...node('table', [theadAstNode(node)(thead), tbodyAstNode(node)(tbody)]),
  thead,
  tbody,
  parse(h) {
    const { children } = this
    return h('table', {}, children.map(child => child.parse(h)))
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

      return tableAstNode(node)(thead, tbody)
    })
  },
});

export default combine(normalize, table, paragraph);
