import { nodes } from 'md-core';


export default class Code extends nodes.VText {
  constructor(string, lang) {
    super(string);
    this.name = 'plain code';
    this.lang = lang || 'noheighlight';
  }
}
