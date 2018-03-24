import { expect } from 'chai';
import md from 'md-core';
import { normalize, atxHeader } from '../src';


describe('# atcHeader', function () {
  const parse = md({ debug: false })
    .use(normalize())
    .use(atxHeader())
    .parse

  it('h1-h6', function () {
    expect(parse('# aaaa').toHTML()).to.equal('<h1>aaaa</h1>')
    // console.log(md({ debug: true }).parse('## aaaa').toHTML());
    // console.log(md({ debug: true }).parse('####### aaaa').toHTML());
  });
});
