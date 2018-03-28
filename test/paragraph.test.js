import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph } from '../src';


describe('# paragraph', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .parse;

  it ('paragraph', function () {
    expect(parse('i am paragraph').toHTML())
      .to.equal('<p>i am paragraph</p>')
  })
});
