# MD-PLUGINS-VIG

[![version](https://img.shields.io/npm/v/detect-env.svg?style=flat-square)](https://www.npmjs.com/package/detect-env)
[![downloads](https://img.shields.io/npm/dm/detect-env.svg?style=flat-square)](https://www.npmjs.com/package/detect-env)

## Support

* normalize
* code
* coseLineCode
* atxHeader
* setexHeader
* list
* blockquote
* table
* hr
* paragraph
* inlineCode
* inlineBold
* inlineItalics
* hyperlink
* image
* autolink
* escaped

## Usage

```javascript
import md from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
  inlineCode, inlineBold, inlineItalics,
  coseLineCode, highlight, html,
} from 'md-plugins-vig';


export default md({ debug : true })
  .use(normalize())
  .use(coseLineCode())
  .use(code())
  .use(highlight())
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
```

see more: [md-core](https://github.com/Val-istar-Guo/md-core)

## code highlight

dependence [highlight.js](https://highlightjs.org/static/demo/),
you need to `import style_you_link from 'highligh.js/styles'`.
