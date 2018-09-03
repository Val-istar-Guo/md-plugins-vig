import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { autolink } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(autolink())
    .parse
})

test(
  'parse http autolink',
  parse,
  '<http://miaooo.me>',
  '<p><a href="http://miaooo.me">http://miaooo.me</a></p>'
)

test(
  'parse ftp autolink',
  parse,
  '<ftp://miaooo.me>',
  '<p><a href="ftp://miaooo.me">ftp://miaooo.me</a></p>'
)

test(
  'parse email autolink',
  parse,
  '<val.istar.guo@gmail.com>',
  '<p><a href="mailto:val.istar.guo@gmail.com">val.istar.guo@gmail.com</a></p>'
)

test(
  'parse http autolink escaped at begin',
  parse,
  '\\<http://miaooo.me>',
  '<p>&lt;http://miaooo.me&gt;</p>'
)

test(
  'parse http autolink escaped at end',
  parse,
  '<http://miaooo.me\\>',
  '<p>&lt;http://miaooo.me&gt;</p>'
)

test(
  'parse email autolink escaped at begin',
  parse,
  '\\<val.istar.guo@gmail.com>',
  '<p>&lt;val.istar.guo@gmail.com&gt;</p>'
)

test(
  'parse email autolink escaped at end',
  parse,
  '<val.istar.guo@gmail.com\\>',
  '<p>&lt;val.istar.guo@gmail.com&gt;</p>'
)
