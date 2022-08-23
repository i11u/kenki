import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { Block, blockAtomsAtom, blockByIdAtom, Position } from './atom'

type BlocksActions = {
  useAddBlock: () => ({ addingBlock }: { addingBlock: Block }) => void
  useChangeBlockPosition: () => ({ blockId, position }: { blockId: string; position: Position }) => void
  useChangeBlockSize: () => ({ blockId, width, height }: { blockId: string; width: number; height: number }) => void
  useChangeBlockStatus: () => ({
    blockId,
    isEmpty,
    isSelected,
    editing,
  }: {
    blockId: string
    isEmpty: boolean
    isSelected: boolean
    editing: boolean
  }) => void
}

export const blocksActions: BlocksActions = {
  useAddBlock: () =>
    useAtomCallback(
      useCallback((get, set, { addingBlock }) => set(blockAtomsAtom, { type: 'insert', value: addingBlock }), [])
    ),

  useChangeBlockPosition: () =>
    useAtomCallback(
      useCallback((get, set, { blockId, position }) => {
        const blockAtom = get(blockByIdAtom(blockId))
        set(blockAtom, (prev: Block) => ({
          ...prev,
          position,
        }))
      }, [])
    ),

  useChangeBlockSize: () =>
    useAtomCallback(
      useCallback((get, set, { blockId, width, height }) => {
        const blockAtom = get(blockByIdAtom(blockId))
        set(blockAtom, (prev) => ({
          ...prev,
          width,
          height,
        }))
      }, [])
    ),
  useChangeBlockStatus: () =>
    useAtomCallback(
      useCallback((get, set, { blockId, isEmpty, isSelected, editing }) => {
        const blockAtom = get(blockByIdAtom(blockId))

        set(blockAtom, (prev) => ({
          ...prev,
          isEmpty,
          isSelected,
          editing,
        }))
      }, [])
    ),
}
