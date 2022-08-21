import { atom, atomFamily } from 'recoil'
import { RecoilAtomKeys } from '../keys'
import { BlockUtils } from '../../utils/block'

export type Position = {
  row: number
  col: number
}

/**
 * Type definition of Block.
 * Block can be of Text, Image, Drawing, etc.
 * */
export type Block = {
  id: string
  page: number
  position: Position
  width: number
  height: number
  blocks: Block[] | null
  isEmpty: boolean
  isSelected: boolean
  editing: boolean
}

/**
 * Type definition of multiple Blocks
 * */
export type Blocks = {
  blocks: Block[]
}

/*
 * Ideally, atoms must not be accessible from components but only from custom hooks, such as actions or selectors.
 * TypeScript currently does not have a feature to export "locally", which may be enabled by:
 * https://github.com/microsoft/TypeScript/issues/41316
 * */
export const blockAtom = atomFamily<Block, Position>({
  key: RecoilAtomKeys.BLOCK,
  default: (position) => BlockUtils.emptyBlock({ position }),
})

export const blocksAtom = atom<Blocks>({
  key: RecoilAtomKeys.BLOCKS,
  default: {
    blocks: [BlockUtils.emptyBlock({ position: { row: 0, col: 0 } })],
  },
})
