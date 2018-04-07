import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, html, splitChar } from '../src';


describe('# html', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(html())
    .use(splitChar())
    .parse

  it('should parse html string', function () {
    expect(parse('string<span style="color: red">fonts</span>').toHTML())
      .to.equal(`<p>string<span style="color: red">fonts</span></p>`)
  })

  it('should not decode html string', function () {
    expect(parse('<font>&amp;</font>').toHTML())
      .to.equal('<p><font>&amp;</font></p>')
  })

  it('should support /< in html tag', function () {
    expect(parse('<font>str\\<span>ss</span></font>').toHTML())
      .to.equal('<p><font>str\\<span>ss</span></font></p>')
  })
})
