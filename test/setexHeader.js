import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, setextHeader } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(normalize())
    .use(setextHeader())
    .parse
})

test(
  'parse h1 using the setex header syntax',
  parse,
  'header one\n========',
  '<h1>header one</h1>'
)

test(
  'parse h2 using the setex header syntax',
  parse,
  'header two\n--------',
  '<h2>header two</h2>'
)
