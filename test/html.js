import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, paragraph, html, splitChar } from '../src'



test.before(t => {
  t.context.parse = md()
    .use(normalize())
    .use(paragraph())
    .use(html())
    .use(splitChar())
    .parse
})

test(
  'parse html',
  parse,
  'string<span style="color: red">fonts</span>',
  '<p>string<span style="color: red">fonts</span></p>'
)

test(
  'parse html with escape characters',
  parse,
  '<font>&amp;</font>',
  '<p><font>&amp;</font></p>'
)

test(
  'parse html include "\\<"',
  parse,
  '<font>str\\<span>ss</span></font>',
  '<p><font>str\\<span>ss</span></font></p>'
)
