import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, inlineBold } from '../src';


describe('# inline bold', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(inlineBold())
    .parse

  it('can parse xxxxx**bold text**', function () {
    expect(parse('xxxxx**bold text**').toHTML())
      .to.equal('<p>xxxxx<strong class="asterisk">bold text</strong></p>')
  });

  it('can parse __bold text__', function () {
    expect(parse('__bold text__').toHTML())
      .to.equal('<p><strong class="underline">bold text</strong></p>')
  });
})
