import { expect } from 'chai';
import md from 'md-core';
import { normalize, blockquote, paragraph } from '../src';


describe('# blockquote', function () {
  const parse = md()
    .use(normalize())
    .use(blockquote())
    .use(paragraph())
    .parse

  it('blockquote', function () {
    expect(parse('> aaaa').toHTML())
      .to.equal('<blockquote><p>aaaa</p></blockquote>');
  });
})
