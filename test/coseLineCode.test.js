import { expect } from 'chai';
import md from 'md-core';
import { normalize, coseLineCode } from '../src';

const code = `
\`\`\`javascript
import path from 'path';


// 扩展配置
export default {
  ssrFileName: 'vue-ssr-bundle.json',
  manifestFileName: 'vue-ssr-manifest.json',
  /**
   * 非同构模块, 不可用于ssr在server端运行
   * 会被默认替代为empty.js
   * 需要在代码中进行兼容处理
   */
  nonIsomorphicModule: {
    // chart: 'chart.js',
  },

  // 非JS模块，不可用于ssr, ssr代码需要在nodejs中运行
  nonJsModule: [
    'normalize.css',
  ],

  // 外部依赖库，打包成独立js包
  lib: [
    'vue',
    'vuex',
    'vue-router',
    'detect-env',
    'superagent',
  ],

  alias: {
    framework: path.resolve(__dirname, '../framework'),
  },
}
\`\`\`
`
describe('# cose line code', function () {
  const parse = md()
    .use(normalize())
    .use(coseLineCode())
    .parse

  it('cose line code', function () {
    expect(parse('```\n/** i am code */\n```').toHTML())
      .to.equal('<pre><code>/** i am code */</code></pre>');
  });

  // it('cose line code', function () {
  //   expect(parse(code).toHTML())
  //     .to.equal('<pre><code>/** i am code */\n</code></pre>');
  // });
})
