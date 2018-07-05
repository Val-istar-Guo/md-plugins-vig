import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, table } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(normalize())
    .use(table({ autoFill: 'line 3' }))
    .parse
})


test(
  'parse table',
  parse,
  `| col one | col two | col three |
|:--------|:-------:|----------:|
| line 1  | line 2  | line 3    |`,
  '<table><thead><tr><th class="left" style="text-align: left">col one</th><th class="center" style="text-align: center">col two</th><th class="left" style="text-align: left">col three</th></tr></thead><tbody><tr><td class="left" style="text-align: left">line 1</td><td class="center" style="text-align: center">line 2</td><td class="left" style="text-align: left">line 3</td></tr></tbody></table>'
)

test(
  'parse no left and right |  table',
  parse,
  ` col one | col two | col three
 :--------|:-------:|----------:
 line 1  | line 2  | line 3`,
  '<table><thead><tr><th class="left" style="text-align: left">col one</th><th class="center" style="text-align: center">col two</th><th class="left" style="text-align: left">col three</th></tr></thead><tbody><tr><td class="left" style="text-align: left">line 1</td><td class="center" style="text-align: center">line 2</td><td class="left" style="text-align: left">line 3</td></tr></tbody></table>'
)

test(
  'parse no right | table',
  parse,
  `| col one | col two | col three
|:--------|:-------:|----------:
| line 1  | line 2  | line 3`,
  '<table><thead><tr><th class="left" style="text-align: left">col one</th><th class="center" style="text-align: center">col two</th><th class="left" style="text-align: left">col three</th></tr></thead><tbody><tr><td class="left" style="text-align: left">line 1</td><td class="center" style="text-align: center">line 2</td><td class="left" style="text-align: left">line 3</td></tr></tbody></table>'
)

test(
  'parse no left | table',
  parse,
  ` col one | col two | col three |
 :--------|:-------:|----------:|
 line 1  | line 2  | line 3    |`,
  '<table><thead><tr><th class="left" style="text-align: left">col one</th><th class="center" style="text-align: center">col two</th><th class="left" style="text-align: left">col three</th></tr></thead><tbody><tr><td class="left" style="text-align: left">line 1</td><td class="center" style="text-align: center">line 2</td><td class="left" style="text-align: left">line 3</td></tr></tbody></table>'
)

test(
  'parse tbody cells not enough table',
  parse,
  ` col one | col two | col three |
 :--------|:-------:|----------:|
 line 1  | line 2`,
  '<table><thead><tr><th class="left" style="text-align: left">col one</th><th class="center" style="text-align: center">col two</th><th class="left" style="text-align: left">col three</th></tr></thead><tbody><tr><td class="left" style="text-align: left">line 1</td><td class="center" style="text-align: center">line 2</td><td class="left" style="text-align: left">line 3</td></tr></tbody></table>'
)

test.todo(
  'parse tbody cells overmuch table'
)
