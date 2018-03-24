import { nodes } from 'md-core';


export default class Inline extends nodes.VText {
  constructor(string) {
    super(string);
    this.name = 'inline';
  }
}
