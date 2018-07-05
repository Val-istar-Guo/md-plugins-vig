import test from 'ava'
import md from 'md-core'
import { normalize, code, coseLineCode, highlight } from '../src'


test('# highlight ', t => {
  const effectiveLangCode = "```javascript\nimport md from 'md-core';\n```"
  const unexistLangCode = "```xxx\nimport md from 'md-core';\n```"
  const unsetLangCode = "    import md from 'md-core';"
  const notLangCode = '    asdfiuehirowefunidfmvwenio'

  const result = '<pre><code class="javascript"><span class="hljs-keyword">import</span> md <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;md-core&#39;</span>;</code></pre>'
  const autoIdentify = '<pre><code class="clean"><span class="hljs-keyword">import</span> md <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;md-core&#39;</span>;</code></pre>'

  const parse = md()
    .use(normalize())
    .use(code())
    .use(coseLineCode())
    .use(highlight())
    .parse

  t.is(parse(effectiveLangCode).toHTML(), result)
  t.is(parse(unexistLangCode).toHTML(), autoIdentify)
  t.is(parse(unsetLangCode).toHTML(), autoIdentify)
  t.notThrows(() => parse(notLangCode).toHTML())
})
