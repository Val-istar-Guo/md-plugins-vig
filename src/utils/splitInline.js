import { inline } from '../nodes';


export default (node, patt, func) => {
  const str = node.text;
  const group = [];

  while(true) {
    const lastIndex = patt.lastIndex;
    const next = patt.exec(str);

    if (!next) {
      if (lastIndex && lastIndex < str.length) {
        group.push(inline(str.substr(lastIndex)));
      }
      break;
    }

    if (next.index !== lastIndex) {
      group.push(inline(str.substring(lastIndex, next.index)));
    }

    group.push(func(next));
  }

  return group;
}
