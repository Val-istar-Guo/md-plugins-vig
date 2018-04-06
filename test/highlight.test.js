import { expect } from 'chai';
import md from 'md-core';
import { normalize, code, coseLineCode, highlight } from '../src';


const effectiveLangCode = `
\`\`\`javascript
import md from 'md-core';
\`\`\`
`;

const unexistLangCode = `
\`\`\`xxx
import md from 'md-core';
\`\`\`
`;

const unsetLangCode = `
    import md from 'md-core';
`;

const notLangCode = `
    asdfiuehirowefunidfmvwenio
`

const result = '<pre><code class="javascript"><span class="hljs-keyword">import</span> md <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;md-core&#39;</span>;</code></pre>'
const autoIdentify = '<pre><code class="clean"><span class="hljs-keyword">import</span> md <span class="hljs-keyword">from</span> <span class="hljs-string">&#39;md-core&#39;</span>;</code></pre>'


describe('# highlight', function () {
  const parse = md()
    .use(normalize())
    .use(code())
    .use(coseLineCode())
    .use(highlight())
    .parse

  it('should parse effective lang code', function () {
    expect(parse(effectiveLangCode).toHTML())
      .to.equal(result)
  })

  it('should auto parse unexist lang code', function () {
    expect(parse(unexistLangCode).toHTML())
      .to.equal(autoIdentify)
  })

  it('should auto parse unset lang code', function () {
    expect(parse(unsetLangCode).toHTML())
      .to.equal(autoIdentify)
  })

  it('should not throw error when parse not language code', function () {
    expect(() => parse(notLangCode).toHTML()).to.not.throw()
  })
})

