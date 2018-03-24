import { block } from '../nodes';



export default (node, patt, func) => {
  const str = node.text;
  const group = [];

  while(true) {
    const lastIndex = patt.lastIndex;
    const next = patt.exec(str);

    if (!next) {
      if (lastIndex && lastIndex < str.length) {
        group.push(block(str.substr(lastIndex)));
      }
      break;
    }

    if (next.index !== lastIndex) {
      group.push(block(str.substring(lastIndex, next.index)));
    }

    group.push(func(next));
  }

  return group;
}
