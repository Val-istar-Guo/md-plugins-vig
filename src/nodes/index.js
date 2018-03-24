import { nodes } from 'md-core';
import Inline from './inline';
import Block from './block';


const { wrap, nodeWrap } = nodes;

export const inline = wrap(Inline);
export const block = wrap(Block);
