import { Position } from '../types/position'
import { FontFamily } from '../types/fontFamily'
import { Style } from '../types/style'
import { Block, TextBlock } from '../states/block'

export const composeBlock = () => 1

export const composeTextBlock = (
  id: string,
  page: number,
  position: Position,
  width: number,
  height: number,
  blocks: Block[] | null,
  text: string,
  parentBlockId: string,
  currentCaretPos: Position,
  scale: number,
  font: FontFamily,
  fontSize: number,
  style: Style
): TextBlock => ({
  id,
  page,
  position,
  width,
  height,
  blocks,
  text,
  parentBlockId,
  currentCaretPos,
  scale,
  font,
  fontSize,
  style,
})

export const emptyBlock = ({ id, position }: { id: string; position: Position }) =>
  composeTextBlock(id, 0, position, 1, 1, null, '', '', { row: 0, col: 0 }, 1, 'SF Mono', 14, 'Plain')
