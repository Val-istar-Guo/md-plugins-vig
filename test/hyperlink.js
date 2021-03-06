import test from 'ava'
import md from 'md-core';
import { parse } from './macros'
import { hyperlink } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(hyperlink({ placeholder: '#' }))
    .parse
})

test(
  'parse hyper link',
  parse,
  '[blog website](miaooo.me)',
  '<p><a href="miaooo.me">blog website</a></p>'
)

test(
  'parse empty hyper link',
  parse,
  '[blog]()',
  '<p><a href="#">blog</a></p>'
)


test(
  'parse hyper link with title written with double quotes',
  parse,
  '[blog](miaooo.me "my blog")',
  '<p><a href="miaooo.me" title="my blog">blog</a></p>'
)

test(
  'parse hyper link with title written with sigle quotes',
  parse,
  "[blog](miaooo.me 'my blog')",
  '<p><a href="miaooo.me" title="my blog">blog</a></p>'
)

test(
  'parse hyper link with escaped',
  parse,
  "\\[blog](miaooo.me 'my blog')",
  '<p>[blog](miaooo.me &#39;my blog&#39;)</p>'
)

test.todo(
  'parse hyper link to nested image',
)
