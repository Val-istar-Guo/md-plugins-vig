import { expect } from 'chai';
import md from 'md-core';
import { normalize, table } from '../src';


const t1 = `
| col one | col two | col three |
|:--------|:-------:|----------:|
| line 1  | line 2  | line 3    |
`

const t2 = `
 col one | col two | col three
:--------|:-------:|----------:
 line 1  | line 2  | line 3
`;

const t3 = `
| col one | col two | col three
|:--------|:-------:|----------:
| line 1  | line 2  | line 3
`;

const t4 = `
 col one | col two | col three |
:--------|:-------:|----------:|
 line 1  | line 2  | line 3    |
`;

const result = '<table><thead><tr><th class="left" style="text-align: left">col one</th><th class="center" style="text-align: center">col two</th><th class="right" style="text-align: right">col three</th></tr></thead><tbody><tr><td class="left" style="text-align: left">line 1</td><td class="center" style="text-align: center">line 2</td><td class="right" style="text-align: right">line 3</td></tr></tbody></table>'

describe('# table', function () {
  const parse = md()
    .use(normalize())
    .use(table())
    .parse

  it('intict table', function () {
    expect(parse(t1).toHTML())
      .to.equal(result)
  });

  it ('no left & right tab', function () {
    expect(parse(t2).toHTML())
      .to.equal(result)
  })

  it ('no right tab', function () {
    expect(parse(t3).toHTML())
      .to.equal(result)
  })

  it ('no left tab', function () {
    expect(parse(t4).toHTML())
      .to.equal(result)
  })
})
