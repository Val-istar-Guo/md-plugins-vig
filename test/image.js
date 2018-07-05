import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, paragraph, image } from '../src'


test.before(t => {
  t.context.parse = md({ placeholder: '#' })
    .use(normalize())
    .use(paragraph())
    .use(image())
    .parse
})


test(
  'parse image',
  parse,
  '![alt text](www.image.link)',
  '<p><img alt="alt text" src="www.image.link" /></p>'
)

test(
  'parse empty image',
  parse,
  '![]()',
  '<p><img src="#" /></p>'
)

test(
  'parse image with title use double quotes',
  parse,
  '![alt text](www.image.link "image title")',
  '<p><img alt="alt text" src="www.image.link" title="image title" /></p>'
)

test(
  'parse image with title use sigle quotes',
  parse,
  "![alt text](www.image.link 'image title')",
  '<p><img alt="alt text" src="www.image.link" title="image title" /></p>'
)

test(
  'parse image have not set alt',
  parse,
  '![](www.image.link)',
  '<p><img src="www.image.link" /></p>'
)

test(
  'parse image with title but not set title',
  parse,
  '![](www.image.link "image title")',
  '<p><img src="www.image.link" title="image title" /></p>'
)
