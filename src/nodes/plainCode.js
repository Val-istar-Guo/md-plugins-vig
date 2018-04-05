import { nodes } from 'md-core';


const { vnode } = nodes;

export default class PlainCode extends nodes.VNode {
  constructor(code, lang) {
    const code$ = vnode('code', { class: lang }, [code])
    super('pre', {}, [code$])

    this.name = 'plain code'
    this.code = code
    this.lang = lang
  }
}
