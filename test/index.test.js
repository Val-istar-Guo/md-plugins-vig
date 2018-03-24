import fs from 'fs';
import { join } from 'path';
import { expect } from 'chai';
import md from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
  inlineCode, inlineBold, inlineItalics,
  coseLineCode,
} from '../src';

const parse = md({ debug : true })
  .use(normalize())
  .use(coseLineCode())
  .use(code())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(list())
  .use(blockquote())
  .use(table())
  .use(paragraph())
  .use(inlineCode())
  .use(inlineBold())
  .use(inlineItalics())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(escaped())
  .parse

const article = fs.readFileSync(join(__dirname, './article.test.md'), 'utf8');

fs.writeFileSync(join(__dirname, './result.test.html'), parse(article).toHTML());

// describe('# all', function () {
//   it('shoule parse article', function () {
//     expect(parse(article).toHTML())
//       .to.equal('');
//   })
// });
