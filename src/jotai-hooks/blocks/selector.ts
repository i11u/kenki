import {PrimitiveAtom, useAtomValue} from 'jotai'
import {useCallback} from 'react'
import {selectAtom} from 'jotai/utils'
import {Block, blockAtomsAtom, blocksAtom} from './atom'

/**
 * You can fetch the current state of blocks
 * only via methods defined in BlocksSelectors.
 * */
type BlockSelectors = {
  useBlockAtoms: () => PrimitiveAtom<Block>[]
  useBlockById: (id: string) => Block | undefined
  useSelectedBlocks: () => Block[]
  useEditingBlock: () => Block | undefined
  useEditingBlockId: () => string
  useNextBlockId: (blockId: string) => string
  useNextBlockIsEmpty: (blockId: string) => boolean
}

const useBlockAtomsSelector = () => useAtomValue(blockAtomsAtom)

const useBlockByIdSelector = (id: string) =>
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

const useNextBlockIdSelector = (blockId: string) =>
  useAtomValue(
    selectAtom(
      blocksAtom,
      useCallback(
        (blocks) => {
          const index = blocks.findIndex((v) => v.id === blockId)
          const block = blocks.at(index === blocks.length - 1 ? 0 : index + 1) as Block
          return block.id
        },
        [blockId]
      )
    )
  )

const useNextBlockIsEmptySelector = (blockId: string) =>
  useAtomValue(
    selectAtom(
      blocksAtom,
      useCallback(
        (blocks) => {
          const index = blocks.findIndex((v) => v.id === blockId)
          const block = blocks.at(index === blocks.length - 1 ? 0 : index + 1) as Block
          return block.isEmpty
        },
        [blockId]
      )
    )
  )

export const blockSelectors: BlockSelectors = {
  useBlockAtoms: useBlockAtomsSelector,
  useBlockById: useBlockByIdSelector,
  useSelectedBlocks: useSelectedBlocksSelector,
  useEditingBlock: useEditingBlockSelector,
  useEditingBlockId: useEditingBlockIdSelector,
  useNextBlockId: useNextBlockIdSelector,
  useNextBlockIsEmpty: useNextBlockIsEmptySelector,
}
