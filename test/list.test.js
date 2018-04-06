import { expect } from 'chai';
import md from 'md-core';
import { normalize, list } from '../src';


const l = '1. 可配置\n2. 配置格式和数据格式高度一致\n3. 支持过滤非法数据\n4. 填充默认值，自动进行类型转换'

describe('#list', function () {
  const parse = md()
    .use(normalize())
    .use(list())
    .parse

  describe.skip('ul', function () {
    const simple = '* list 1\n* list 2\n* list 3';

    it('simple', function () {
      expect(parse(simple).toHTML())
        .to.equal('<ul><li>list 1</li><li>list 2</li><li>list 3</li></ul>');
    })

    it('block in list', function () {

    })
  })

  describe('ol', function () {
    const simple = '1. list 1\n2. list 2\n3. list 3';

    it('simple', function () {
      expect(parse(l).toHTML())
        .to.equal('<ol><li>list 1</li><li>list 2</li><li>list 3</li></ol>');
    })
  })


  it('child list', function () {

  })
})
