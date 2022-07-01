import { atom, selector, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil'
import { Style } from '../types/style'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'
import { Position } from '../types/position'
import { FontFamily } from '../types/fontFamily'

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
}

/**
 * Type definition of Block with text.
 * */
export type TextBlock = Block & {
  text: string
  parentBlockId: string
  currentCaretPos: Position
  scale: number
  font: FontFamily
  fontSize: number
  style: Style
}

/**
 * Type definition of the selected Block in a document.
 * */
type CurrentBlock = {
  block: Block | undefined
}

/**
 * currentBlock is a Recoil Atom for a selected or focused block.
 * Note that this Atom (also all Atoms in this app) is not exported to outside.
 * Any manipulation on blocksState will be via custom hooks.
 * @see {CurrentBlockActions, CurrentBlockSelectors}.
 * */
const currentBlockAtom = atom<CurrentBlock>({
  key: RecoilAtomKeys.CURRENT_BLOCK,
  default: {
    block: undefined,
  },
})

type CurrentBlockActions = {
  useSetCurrentBlock: () => (block: Block) => void
}

export const currentBlockActions: CurrentBlockActions = {
  useSetCurrentBlock: () =>
    useRecoilCallback(
      ({ set }) =>
        (block: Block) => {
          set(currentBlockAtom, (prev) => ({ ...prev, block }))
        },
      []
    ),
}

type CurrentBlockSelectors = {
  useCurrentBlock: () => Block | undefined
}

const currentBlockSelector = selector<Block | undefined>({
  key: RecoilSelectorKeys.CURRENT_BLOCK_CURRENT,
  get: ({ get }) => get(currentBlockAtom).block,
})

export const currentBlockSelectors: CurrentBlockSelectors = {
  useCurrentBlock: () => useRecoilValue(currentBlockSelector),
}

/**
 * Type definition of multiple Blocks
 * */
export type Blocks = {
  blocks: Block[]
}

/**
 * blocks is a Recoil Atom for all the block in a document.
 * @see {BlocksActions, BlockSelectors}.
 * */
const blocksAtom = atom<Blocks>({
  key: RecoilAtomKeys.BLOCKS,
  default: {
    blocks: [] as Block[],
  },
})

type BlocksActions = {
  useAddTextBlock: () => (block: TextBlock) => void
}

export const blocksActions: BlocksActions = {
  useAddTextBlock: () =>
    useRecoilCallback(
      ({ set }) =>
        (block: Block) => {
          set(blocksAtom, (prev) => ({
            ...prev,
            blocks: [...prev.blocks, block],
          }))
        },
      []
    ),
}

/**
 * You can fetch the current state of block
 * only via methods defined in BlocksSelectors.
 * */
type BlockSelectors = {
  useBlocks: () => Block[]
  useBlockById: (id: string) => Block | undefined
}

const blocksSelector = selector<Block[]>({
  key: RecoilSelectorKeys.BLOCKS,
  get: ({ get }) => get(blocksAtom).blocks,
})

const blockSelector = selectorFamily<Block | undefined, string>({
  key: RecoilSelectorKeys.BLOCK_BY_ID,
  get:
    (id) =>
    ({ get }) => {
      const { blocks } = get(blocksAtom)
      return blocks.find((v) => v.id === id)
    },
})

export const blocksSelectors: BlockSelectors = {
  useBlocks: () => useRecoilValue(blocksSelector),
  useBlockById: (id: string) => useRecoilValue(blockSelector(id)),
}
