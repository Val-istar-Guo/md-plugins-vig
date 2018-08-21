import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { list } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(list())
    .parse
})

test(
  'parse ul syntax',
  parse,
  '* list 1\n* list 2\n* list 3',
  '<ul><li class="ul">list 1</li><li class="ul">list 2</li><li class="ul">list 3</li></ul>'
)

test(
  'parse ol syntax',
  parse,
  '1. list 1\n2. list 2\n3. list 3',
  '<ol><li class="ol">list 1</li><li class="ol">list 2</li><li class="ol">list 3</li></ol>'
)

test.todo(
  'parse ol and ul hybrid syntax'
)

test.todo(
  'parse nested syntax for list',
)
