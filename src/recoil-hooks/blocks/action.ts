import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { Block, blocksAtom, Position } from './atom'

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
    useAtomCallback(useCallback((get, set, { addingBlock }) => set(blocksAtom, (prev) => [...prev, addingBlock]), [])),
  useChangeBlockPosition: () =>
    useAtomCallback(
      useCallback(
        (get, set, { blockId, position }) =>
          set(blocksAtom, (prev) =>
            prev.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    position,
                  }
                : block
            )
          ),
        []
      )
    ),
  useChangeBlockSize: () =>
    useAtomCallback(
      useCallback(
        (get, set, { blockId, width, height }) =>
          set(blocksAtom, (prev) =>
            prev.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    width,
                    height,
                  }
                : block
            )
          ),
        []
      )
    ),
  useChangeBlockStatus: () =>
    useAtomCallback(
      useCallback(
        (get, set, { blockId, isEmpty, isSelected, editing }) =>
          set(blocksAtom, (prev) =>
            prev.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    isEmpty,
                    isSelected,
                    editing,
                  }
                : block
            )
          ),
        []
      )
    ),
}
