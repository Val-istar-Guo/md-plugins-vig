import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { inlineItalics } from '../src'

test.before(t => {
  t.context.parse = md()
    .use(inlineItalics())
    .parse
})

test(
  'parse italics syntax written with an asterisk',
  parse,
  'xxxxx*italics text*',
  '<p>xxxxx<em class="asterisk">italics text</em></p>'
)

test(
  'parse italics syntax written with an underline',
  parse,
  '_italics text_',
  '<p><em class="underline">italics text</em></p>',
)

test(
  'parse italics syntax that start with escaped',
  parse,
  '\\_italics text_',
  '<p>_italics text_</p>',
)

test.todo(
  'parse italics syntax that end with escaped',
  // parse,
  // '_italics text\\_',
  // '<p>_italics text_</p>',
)

test.todo(
  'parse italics syntax that include escaped',
  // parse,
  // '_italics \\_text__',
  // '<p><em class="underline">italics _text</em></p>_',
)

test.todo(
'parse italics syntax that include escaped char'
)


