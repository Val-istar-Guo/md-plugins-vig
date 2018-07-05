import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, paragraph, inlineItalics, splitChar } from '../src'


test.before(t => {
  t.context.parse = md({ placeholder: '#' })
    .use(normalize())
    .use(paragraph())
    .use(inlineItalics())
    .use(splitChar())
    .parse
})

test(
  'parse bold syntax written with an asterisk',
  parse,
  'xxxxx*italics text*',
  '<p>xxxxx<em class="asterisk">italics text</em></p>'
)

test(
  'parse bold syntax written with an underline',
  parse,
  '_italics text_',
  '<p><em class="underline">italics text</em></p>',
)

test.todo(
'parse italics syntax that include escaped char'
)


