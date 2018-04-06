import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, br } from '../src';

describe('# hr', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(br())
    .parse

  it('hr', function () {
    expect(parse('nihaonihao  \nnext line').toHTML())
      .to.equal('<p>nihaonihao<br />next line</p>');
  });
})
