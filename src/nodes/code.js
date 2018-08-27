export default node => (content, language = '') => ({
  ...node('code', content),
  language,
  parse(h) {
    const { value, language } = this

    return h('pre', {}, [
      h('code', { class: language }, [value])
    ])
  }
})
