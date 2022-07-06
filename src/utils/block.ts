import { Position } from '../types/position'
import { Block } from '../states/block'

export const composeBlock = (
  id: string,
  page: number,
  position: Position,
  width: number,
  height: number,
  blocks: Block[] | null,
  content: HTMLDivElement | null
): Block => ({
  id,
  page,
  position,
  width,
  height,
  blocks,
  content,
})

export const emptyBlock = ({ id, position }: { id: string; position: Position }) =>
  composeBlock(id, 0, position, 1, 1, null, null)
