import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { paragraph } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(paragraph())
    .parse;
})

test(
  'parse paragraph syntax',
  parse,
  'i am paragraph',
  '<p>i am paragraph</p>'
)

