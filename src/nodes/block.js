export default node => value => ({
  ...node('block', value),
  parse() {
    throw new Error('something cannot be parse, and more plug-in?')
  },
})
