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

test.todo(
  'parse atx header syntax with overmuch #',
)

test.todo(
  'parse atx header syntax with same amount of # suffix'
)

test.todo(
  'parse atx header syntax with overmuch # suffix'
)

test.todo(
  'parse atx header syntax with lacking # suffix'
)
