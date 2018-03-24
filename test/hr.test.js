import { expect } from 'chai';
import md from 'md-core';
import { normalize, hr } from '../src';

describe('# hr', function () {
  const parse = md({ debug: false })
    .use(normalize())
    .use(hr())
    .parse

  it('hr', function () {
    expect(parse('---------').toHTML())
      .to.equal('<hr class="dash" />');
  });
})
