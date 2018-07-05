import test from 'ava';
import md from 'md-core';
import { parse } from './macros'
import { normalize, paragraph, escaped } from '../src';


test.before(t => {
  t.context.parse = md()
    .use(normalize())
    .use(paragraph())
    .use(escaped())
    .parse
})

test(
  'parse escaped syntax(include \\ ` * _ { } [ ] ( ) # * + - . ! < >)',
  parse,
  '\\\\\\`\\*\\_\\{\\}\\[\\]\\(\\)\\#\\*\\+\\-\\.\\!\<\>',
  '<p>\\`*_{}[]()#*+-.!&lt;&gt;</p>',
)
