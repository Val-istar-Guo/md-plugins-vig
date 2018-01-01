import { expect } from 'chai';
import mdf from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped, inlineCode,
} from '../src';


const md = mdf()
  .use(normalize())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(list())
  .use(blockquote())
  .use(table())
  .use(code())
  .use(paragraph())
  .use(inlineCode())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(escaped());

const str = `
aaaaa\`bb\`aaa
`;

describe('myMd', function () {
  it('', function () {
    console.log(md.parse(str).toHtml());
  });
});
