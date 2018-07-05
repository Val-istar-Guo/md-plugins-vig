import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, paragraph, inlineCode, splitChar } from '../src'


test.before(t => {
  t.context.parse = md({ placeholder: '#' })
    .use(normalize())
    .use(paragraph())
    .use(inlineCode())
    .use(splitChar())
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

test.todo('parse inline code with extra backquote')
