import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, html } from '../src';


const string = '<span style="color: red">fonts</span>';
describe('# html', function () {
  const parse = md({ debug: false })
    .use(normalize())
    .use(paragraph())
    .use(html())
    .parse

  it('should parse html string', function () {
    expect(parse(string).toHTML())
      .to.equal(`<p>${string}</p>`)
  })
})
