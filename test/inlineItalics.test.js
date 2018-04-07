import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, inlineItalics, splitChar } from '../src';


describe('# inline italics', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(inlineItalics())
    .use(splitChar())
    .parse

  it('can parse xxxxx*italics text*', function () {
    expect(parse('xxxxx*italics text*').toHTML())
      .to.equal('<p>xxxxx<em class="asterisk">italics text</em></p>')
  });

  it('can parse _italics text_', function () {
    expect(parse('_italics text_').toHTML())
      .to.equal('<p><em class="underline">italics text</em></p>')
  });
})

