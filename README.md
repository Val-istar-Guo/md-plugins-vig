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
  coseLineCode,
} from 'md-plugins-vig';


export default md({ debug : true })
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
```

see more: [md-core](https://github.com/Val-istar-Guo/md-core)
