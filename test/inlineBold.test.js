import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, inlineBold, splitChar } from '../src';


describe('# inline bold', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(inlineBold())
    .use(splitChar())
    .parse

  it.skip('can parse x**bold text**', function () {
    expect(parse('x**bold text**').toHTML())
      .to.equal('<p>x<strong class="asterisk">bold text</strong></p>')
  });

  it('parse x**bold \\* text** should include *', function () {
    expect(parse('x**bold \\* text**').toHTML())
      .to.equal('<p>x<strong class="asterisk">bold \\* text</strong></p>')
  });

  it.only('can parse __bold text__', function () {
    expect(parse('__bold text__endstring').toHTML())
      .to.equal('<p><strong class="underline">bold text</strong>endstring</p>')
  });
})
