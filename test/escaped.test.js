import { expect } from 'chai';
import md from 'md-core';
import { normalize, paragraph, escaped } from '../src';


describe('# escaped', function () {
  const parse = md()
    .use(normalize())
    .use(paragraph())
    .use(escaped())
    .parse

  it('should esacape: \\ ` * _ { } [ ] ( ) # * + - . ! < >', function () {
    expect(parse('\\\\\\`\\*\\_\\{\\}\\[\\]\\(\\)\\#\\*\\+\\-\\.\\!\<\>').toHTML())
      .to.equal('<p>\\`*_{}[]()#*+-.!&lt;&gt;</p>')
  })
})
