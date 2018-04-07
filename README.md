# MD-PLUGINS-VIG

[![version](https://img.shields.io/npm/v/md-plugins-vig.svg?style=flat-square)](https://www.npmjs.com/package/md-plugins-vig)
[![downloads](https://img.shields.io/npm/dm/md-plugins-vig.svg?style=flat-square)](https://www.npmjs.com/package/md-plugins-vig)


# Install

```bash
npm install md-plugins-vig

# if you need highlight code
npm install highlight.js
```

## Support

* normalize
* highlight (code hightlight dependence highlight.js)
* code
* coseLineCode
* atxHeader
* setexHeader
* list
* blockquote
* table
* hr
* paragraph
* escaped
* inlineCode
* inlineBold
* inlineItalics
* hyperlink
* image
* autolink
* html

## Usage

### Default config

Default config include highlight plugin that dependence highlight.js
you need to ```npm install highlight.js```

```javascript
import md from 'md-core'
import { plugins } from 'md-plugins-vig'

export default md().use(plugins)
```


### Custom config

You can also chose what plugin you want.
The configuration in the case is the same as the default configuration.
The order of reference of the plug-in may affect the priority and efficiency of parsing.


```javascript
import md from 'md-core';
import {
  normalize, atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink, escaped,
  inlineCode, inlineBold, inlineItalics,
  coseLineCode, highlight, html, br,
  splitChar,
} from 'md-plugins-vig';


export default md()
  .use(normalize())
  .use(coseLineCode())
  .use(list())
  .use(code())
  /**
   * if you don't want to use highlight remove this plugin
   * also don't need install highlight.js
   */
  .use(highlight())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
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
  .use(br())
  .use(splitChar())
```


## Code Highlight

if you use highlight plugin, you need to `import style_you_link from 'highligh.js/styles'`.
you can preview style at [highlight.js](https://highlightjs.org/static/demo/),
and chose what style you like.

## See More
[md-core](https://github.com/Val-istar-Guo/md-core)
