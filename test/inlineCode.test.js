import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, inlineCode } from '../src';


describe('# inline code', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(inlineCode())
    .parse

  it('can parse xxxxx`code text`', function () {
    expect(parse('xxxxx`code text`').toHTML())
      .to.equal('<p>xxxxx<code>code text</code></p>')
  });

  it('can parse `````code text````', function () {
    expect(parse('`````code text````').toHTML())
      .to.equal('<p><code>`code text</code></p>')
  });
})
