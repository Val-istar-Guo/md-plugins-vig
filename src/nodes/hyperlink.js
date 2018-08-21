export default node => (href, content, title = '') => ({
  ...node('hyperlink', content),
  href,
  title,
  parse(h) {
    const { href, title, value } = this
    return h('a', { href, title }, [value])
  }
})
