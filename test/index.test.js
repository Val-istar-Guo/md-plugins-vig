import fs from 'fs';
import { join } from 'path';
import { expect } from 'chai';
import md from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
  inlineCode, inlineBold, inlineItalics,
  coseLineCode, highlight, html,
} from '../src';

const parse = md({ debug : false })
  .use(normalize())
  .use(coseLineCode())
  .use(code())
  .use(highlight({ lineNumber: true }))
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(list())
  .use(blockquote())
  .use(table())
  .use(paragraph())
  .use(escaped())
  .use(inlineCode())
  .use(inlineBold())
  .use(inlineItalics())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(html())
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
