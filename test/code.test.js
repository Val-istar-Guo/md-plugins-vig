import { expect } from 'chai';
import md from 'md-core';
import { normalize, code } from '../src';

describe('# code', function () {
  const parse = md({ debug: false })
    .use(normalize())
    .use(code())
    .parse

  it('code', function () {
    expect(parse('    /** i am code */').toHTML())
      .to.equal('<pre><code>/** i am code */</code></pre>');
  });
})
