import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { atxHeader } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(atxHeader())
    .parse
})

test(
  'parse atx header syntax',
  parse,
  '# aaaa',
  '<h1>aaaa</h1>'
)

test(
  'parse atx header syntax with overmuch #',
  parse,
  '####### aaaa',
  '<h6># aaaa</h6>'
)

test(
  'parse atx header syntax with same amount of # suffix',
  parse,
  '### aaa ###',
  '<h3>aaa</h3>'
)

test(
  'parse atx header syntax with overmuch # suffix',
  parse,
  '### aaa ####',
  '<h3>aaa</h3>'
)

test(
  'parse atx header syntax with lacking # suffix',
  parse,
  '### aaa##',
  '<h3>aaa</h3>'
)

test(
  'parse atx header content escaped #',
  parse,
  '###\\#aaa###',
  '<h3>#aaa</h3>'
)
