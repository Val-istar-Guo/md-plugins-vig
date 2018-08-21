import inline from './inline'


export default node => (level, content) => ({
  ...node('header', [inline(node)(content)]),
  level,
  parse(h) {
    const { level, children } = this
    return h(`h${level}`, {}, children.map(child => child.parse(h)))
  }
})
