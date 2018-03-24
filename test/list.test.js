import { expect } from 'chai';
import md from 'md-core';
import { normalize, list } from '../src';


describe('#list', function () {
  const parse = md({ debug: false })
    .use(normalize())
    .use(list())
    .parse

  const simple = '* list 1\n* list 2\n* list 3';

  it('simple', function () {
    expect(parse(simple).toHTML())
      .to.equal('<ul><li>list 1</li><li>list 2</li><li>list 3</li></ul>');
  })

  it('block in list', function () {

  })

  it('child list', function () {

  })
})
