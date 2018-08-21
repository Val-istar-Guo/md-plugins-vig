import { htmlEncode } from 'md-core/utils';


export default node => value => ({
  ...node('text', value),
  parse() {
    return htmlEncode(this.value)
  }
})
