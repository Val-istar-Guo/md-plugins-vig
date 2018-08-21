import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { inlineBold } from '../src'


test.before(t => {
  t.context.parse = md({ placeholder: '#' })
    .use(inlineBold())
    .parse
})

test(
  'parse bold syntax written with an asterisk',
  parse,
  'x**bold text**',
  '<p>x<strong class="asterisk">bold text</strong></p>'
)

test(
  'parse bold syntax written with an underline',
  parse,
  '__bold text__endstring',
  '<p><strong class="underline">bold text</strong>endstring</p>'
)

test(
  'parse bold syntax that include escaped char',
  parse,
  'x**bold \\* text**',
  '<p>x<strong class="asterisk">bold \\* text</strong></p>'
)
