import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { selectAtom } from 'jotai/utils'
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

const useBlocksSelector = () =>
  useAtomValue<Block[]>(
    selectAtom(
      blocksAtom,
      useCallback((blocks) => blocks, [])
    )
  )

const useBlockSelector = (id: string) =>
  useAtomValue<Block | undefined>(
    selectAtom(
      blocksAtom,
      useCallback((blocks) => blocks.find((v) => v.id === id), [id])
    )
  )

const useSelectedBlocksSelector = () =>
  useAtomValue<Block[]>(
    selectAtom(
      blocksAtom,
      useCallback((blocks) => blocks.filter((v) => v.isSelected), [])
    )
  )

const useNextBlockSelector = (id: string) =>
  useAtomValue(
    selectAtom(
      blocksAtom,
      useCallback(
        (blocks) => {
          const index = blocks.findIndex((v) => v.id === id)
          return blocks.find((v, i) => (index === blocks.length - 1 ? i === 0 : i === index + 1))
        },
        [id]
      )
    )
  )

const useEditingBlockSelector = () =>
  useAtomValue(
    selectAtom(
      blocksAtom,
      useCallback((blocks) => blocks.find((v) => v.editing), [])
    )
  )

const useEditingBlockIdSelector = () =>
  useAtomValue(
    selectAtom(
      blocksAtom,
      useCallback((blocks) => {
        const block = blocks.find((v) => v.editing) as Block
        return block.id
      }, [])
    )
  )

export const blockSelectors: BlockSelectors = {
  useBlocks: useBlocksSelector,
  useBlockById: useBlockSelector,
  useSelectedBlocks: useSelectedBlocksSelector,
  useNextBlock: useNextBlockSelector,
  useEditingBlock: useEditingBlockSelector,
  useEditingBlockId: useEditingBlockIdSelector,
}
