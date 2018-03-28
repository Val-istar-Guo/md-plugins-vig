import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, hyperlink } from '../src';


const plainLink = '[blog website](miaooo.me)'
const linkWithTitleUseDoubleQuotes = '[blog](miaooo.me "my blog")'
const linkWithTitleUseSigleQuotes = "[blog](miaooo.me 'my blog')"
const emptyLink = '[blog]()';

describe('# hyperlink', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(hyperlink({ placeholder: '#' }))
    .parse

  it(`should parse ${emptyLink}`, function () {
    expect(parse(emptyLink).toHTML())
      .to.equal('<p><a href="#">blog</a></p>')
  })

  it(`should parse ${plainLink}`, function () {
    expect(parse(plainLink).toHTML())
      .to.equal('<p><a href="miaooo.me">blog website</a></p>')
  })

  it(`should parse ${linkWithTitleUseDoubleQuotes}`, function () {
    expect(parse(linkWithTitleUseDoubleQuotes).toHTML())
      .to.equal('<p><a href="miaooo.me" title="my blog">blog</a></p>')
  })

  it(`should parse ${linkWithTitleUseSigleQuotes}`, function () {
    expect(parse(linkWithTitleUseSigleQuotes).toHTML())
      .to.equal('<p><a href="miaooo.me" title="my blog">blog</a></p>')
  })
})

