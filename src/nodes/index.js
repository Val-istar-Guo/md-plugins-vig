// import { nodes } from 'md-core';
// import Inline from './inline';
// import Block from './block';
// import PlainCode from './plainCode';


// const { wrap, nodeWrap } = nodes;

// export const inline = wrap(Inline);
// export const block = wrap(Block);
// export const plainCode = wrap(PlainCode);

export { default as block } from './block'
export { default as inline } from './inline'
export { default as header } from './header'
export { default as code } from './code'
export { default as hyperlink } from './hyperlink'
export { default as text } from './text'
