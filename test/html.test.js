import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, html } from '../src';


const string = '<span style="color: red">fonts</span>';
describe('# html', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(html())
    .parse

  it('should parse html string', function () {
    expect(parse(string).toHTML())
      .to.equal(`<p>${string}</p>`)
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
