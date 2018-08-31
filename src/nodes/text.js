export default node => value => ({
  ...node('text', value),
  parse() {
    return this.value
  }
})
