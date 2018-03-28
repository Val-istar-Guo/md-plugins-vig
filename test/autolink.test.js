import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, autolink } from '../src';


describe('# autolink', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(autolink())
    .parse

  it('should parse <http://miaooo.me>', function () {
    expect(parse('<http://miaooo.me>').toHTML())
      .to.equal('<p><a href="http://miaooo.me">http://miaooo.me</a></p>')
  })

  it('should parse <https://miaooo.me>', function () {
    expect(parse('<https://miaooo.me>').toHTML())
      .to.equal('<p><a href="https://miaooo.me">https://miaooo.me</a></p>')
  })

  it('should parse <ftp://miaooo.me>', function () {
    expect(parse('<ftp://miaooo.me>').toHTML())
      .to.equal('<p><a href="ftp://miaooo.me">ftp://miaooo.me</a></p>')
  })
  it('should parse <val.istar.guo@gmail.com>', function () {
    expect(parse('<val.istar.guo@gmail.com>').toHTML())
      .to.equal('<p><a href="mailto:val.istar.guo@gmail.com">val.istar.guo@gmail.com</a></p>')
  })
})

