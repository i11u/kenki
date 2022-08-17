import { selector, selectorFamily, useRecoilValue } from 'recoil'
import { RecoilSelectorKeys } from '../keys'
import { Block, blocksAtom } from './atom'

/**
 * You can fetch the current state of blocks
 * only via methods defined in BlocksSelectors.
 * */
type BlockSelectors = {
  useBlocks: () => Block[]
  useBlockById: (id: string) => Block | undefined
  useSelectedBlocks: () => Block[]
  useEditingBlock: () => Block | undefined
  useEditingBlockId: () => string
  useNextBlock: (id: string) => Block | undefined
}

const blocksSelector = selector<Block[]>({
  key: RecoilSelectorKeys.BLOCKS,
  get: ({ get }) => get(blocksAtom).blocks,
})

const selectedBlocksSelector = selector<Block[]>({
  key: RecoilSelectorKeys.SELECTED_BLOCKS,
  get: ({ get }) => {
    const { blocks } = get(blocksAtom)
    return blocks.filter((v) => v.isSelected)
  },
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

const nextBlockSelector = selectorFamily<Block | undefined, string>({
  key: RecoilSelectorKeys.NEXT_BLOCK,
  get:
    (id) =>
    ({ get }) => {
      const { blocks } = get(blocksAtom)
      const index = blocks.findIndex((v) => v.id === id)
      return blocks.find((v, i) => (index === blocks.length - 1 ? i === 0 : i === index + 1))
    },
})

const editingBlockSelector = selector<Block | undefined>({
  key: RecoilSelectorKeys.EDITING_BLOCK as string,
  get: ({ get }) => {
    const { blocks } = get(blocksAtom)
    return blocks.find((v) => v.editing)
  },
})

const editingBlockIdSelector = selector<string>({
  key: RecoilSelectorKeys.EDITING_BLOCK_ID as string,
  get: ({ get }) => {
    const { blocks } = get(blocksAtom)
    const block = blocks.find((v) => v.editing) as Block
    return block.id
  },
})

export const blockSelectors: BlockSelectors = {
  useBlocks: () => useRecoilValue(blocksSelector),
  useBlockById: (id: string) => useRecoilValue(blockSelector(id)),
  useSelectedBlocks: () => useRecoilValue(selectedBlocksSelector),
  useEditingBlock: () => useRecoilValue(editingBlockSelector),
  useEditingBlockId: () => useRecoilValue(editingBlockIdSelector),
  useNextBlock: (id: string) => useRecoilValue(nextBlockSelector(id)),
}
