## Introduction

@mtfe/create-fechi-component 中的示例组件

## API
<!-- API_START -->

<details>
<summary>查看示例代码</summary>
<pre>
/* eslint global-require: 0 */
import React from 'react';

import ComponentDemo from '../ComponentDemo';
import ComponentDemo2 from '../ComponentDemo2';
import ComponentDemo3 from '../Demo/ComponentDemo3';

const Demo = () => (<div>
 <ComponentDemo />
 <ComponentDemo2 />
 <ComponentDemo3 />
</div>);

Demo.getInitialCssText = () => [
 require('../kdb.m.css'),
 require('../pangu.m.css'),
].join('\n');

export default Demo;

</pre>
</details>

#### ComponentDemo
|属性名|类型|是否必须|默认值|描述|
|----------|----------|----------|----------|----------|
|`title`|`string`|no|'Hello, create-fechi-component'|组件名称class component|
|`theme`|`object`|no|无|组件主题|

#### ComponentDemo2
|属性名|类型|是否必须|默认值|描述|
|----------|----------|----------|----------|----------|
|`title`|`string`|no|'Hello, create-fechi-component'|组件名称 functional component|
|`theme`|`object`|no|无||

#### ComponentDemo3
|属性名|类型|是否必须|默认值|描述|
|----------|----------|----------|----------|----------|
|`title`|`string`|no|'Hello, create-fechi-component'|组件名称 functional component|

<!-- API_END -->
