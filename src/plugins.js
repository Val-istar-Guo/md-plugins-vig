import { compose } from 'md-core'
import { default as atxHeader } from './atxHeader'
import { default as normalize } from './normalize'
import { default as paragraph } from './paragraph'
import { default as hr } from './hr'
import { default as blockquote } from './blockquote'
import { default as escaped } from './escaped'
import { default as setextHeader } from './setextHeader'
import { default as autolink } from './autolink'
import { default as code } from './code'
import { default as hyperlink } from './hyperlink'
import { default as image } from './image'
import { default as table } from './table'
import { default as list } from './list'
import { default as inlineCode } from './inlineCode'
import { default as inlineBold } from './inlineBold'
import { default as inlineItalics } from './inlineItalics'
import { default as coseLineCode } from './coseLineCode'
import { default as highlight } from './highlight'
import { default as html } from './html'
import { default as br } from './br'


export default compose([
  normalize,
  // NOTE: cose line code should before list
  coseLineCode,
  list,
  // NOTE: normal code should after list
  code,
  highlight,
  atxHeader,
  setextHeader,
  hr,
  blockquote,
  table,
  paragraph,
  /**
   * NOTE: html should before escaped avoid '\<' to be escaping,
   *       exp. <font>xx\<span>ss</span></font>, '\' should be keep
   */
  html,
  escaped,
  inlineCode,
  inlineBold,
  inlineItalics,
  hyperlink,
  image,
  autolink,
  br,
])
