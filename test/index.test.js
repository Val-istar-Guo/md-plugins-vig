import fs from 'fs';
import { join } from 'path';
import { expect } from 'chai';
import md from 'md-core';
import { plugins } from '../src';

const parse = md({ debug : false })
  .use(plugins())
  .parse

const article = fs.readFileSync(join(__dirname, './article.test.md'), 'utf8');

const body = parse(article).toHTML();

const content = `
<html>
<head>
<link rel="stylesheet" type="text/css" href="../node_modules/highlight.js/styles/github.css" />
</head>
<body>${body}</body>
</html>
`;

fs.writeFileSync(join(__dirname, './result.test.html'), content);

// describe('# all', function () {
//   it('shoule parse article', function () {
//     expect(parse(article).toHTML())
//       .to.equal('');
//   })
// });
