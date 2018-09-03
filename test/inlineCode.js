import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { inlineCode } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(inlineCode())
    .parse
})

test(
  'parse inline code',
  parse,
  'xxxxx`code text`',
  '<p>xxxxx<code>code text</code></p>'
)

test(
  'parse inline code with multi backquote',
  parse,
  '`````code text````',
  '<p><code>`code text</code></p>'
)

test.todo(
  'parse inline code that include escaped',
  // parse,
  // '`````code text\\````',
  // '<p><code>`code text`</code></p>'
)

test.todo('parse inline code with extra backquote')
