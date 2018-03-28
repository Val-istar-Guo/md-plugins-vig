import { expect } from 'chai';
import md from 'md-core';
import { normalize, setextHeader } from '../src';


describe('# setex header', function () {
  const parse = md()
    .use(normalize())
    .use(setextHeader())
    .parse


  it('h1', function () {
    expect(parse('header one\n========').toHTML())
      .to.equal('<h1>header one</h1>')
  })

  it('h2', function () {
    expect(parse('header two\n--------').toHTML())
      .to.equal('<h2>header two</h2>')
  })
})
