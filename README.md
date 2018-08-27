# MD-PLUGINS-VIG

[![version](https://img.shields.io/npm/v/md-plugins-vig.svg?style=flat-square)](https://www.npmjs.com/package/md-plugins-vig)
[![downloads](https://img.shields.io/npm/dm/md-plugins-vig.svg?style=flat-square)](https://www.npmjs.com/package/md-plugins-vig)
[![dependencies](https://img.shields.io/david/Val-istar-Guo/md-plugins-vig.svg?style=flat-square)](https://www.npmjs.com/package/md-plugins-vig)


# Install

```bash
npm install md-plugins-vig
```

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
import { vigMdPlugins } from 'md-plugins-vig'

export default md().use(vigMdPlugins())
```


### Custom config

You can also chose what plugin you want.
The configuration in the case is the same as the default configuration.
The order of reference of the plug-in may affect the priority and efficiency of parsing.


```javascript
import md from 'md-core';
import {
  atxHeader, setextHeader,
  hr, list, blockquote, table, code, paragraph,
  hyperlink, image, autolink,
  inlineCode, inlineBold, inlineItalics,
  coseLineCode, html, br,
} from 'md-plugins-vig';


export default md()
  .use(coseLineCode())
  .use(list())
  .use(code())
  .use(atxHeader())
  .use(setextHeader())
  .use(hr())
  .use(blockquote())
  .use(table())
  .use(paragraph())
  .use(inlineCode())
  .use(inlineBold())
  .use(inlineItalics())
  .use(hyperlink())
  .use(image())
  .use(autolink())
  .use(html())
  .use(br())
```


## See More
[md-core](https://github.com/Val-istar-Guo/md-core)
[md-highlight](https://github.com/Val-istar-Guo/md-plugins-highlight)
