import { combine } from 'md-core/utils'


import { default as atxHeader } from './atxHeader'
import { default as paragraph } from './paragraph'
import { default as hr } from './hr'
import { default as blockquote } from './blockquote'
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
import { default as html } from './html'
import { default as br } from './br'


export default combine(
  coseLineCode,
  list,
  code,
  atxHeader,
  setextHeader,
  hr,
  blockquote,
  table,
  paragraph,
  inlineCode,
  inlineBold,
  inlineItalics,
  hyperlink,
  image,
  autolink,
  html,
  br,
)
