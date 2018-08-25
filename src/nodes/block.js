// import { nodes } from 'md-core';


// export default class Block extends nodes.VText {
//   constructor(string) {
//     super(string);
//     this.name = 'block';
//   }

//   toHTML() {
//     throw new Error('block expect someone middleware to parse:')
//   }
// }

export default node => value => ({
  ...node('block', value),
  parse() {
    throw new Error('something cannot be parse, and more plug-in?')
  },
})
