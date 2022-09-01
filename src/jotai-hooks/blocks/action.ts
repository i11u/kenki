import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { match } from 'ts-pattern'
import { Block, blockAtomsAtom, blockByIdAtom, Position } from './atom'

type BlocksActions = {
  useAddBlock: () => ({ addingBlock }: { addingBlock: Block }) => void
  useUpdateBlock: () => ({ blockId, newProps }: { blockId: string; newProps: object }) => void
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

type Direction = 'left' | 'down' | 'up' | 'right'

export const useMoveBlock = (): (({ blockId, direction }: { blockId: string; direction: Direction }) => void) =>
  useAtomCallback(
    useCallback((get, set, { blockId, direction }) => {
      const blockAtom = get(blockByIdAtom(blockId))
      set(blockAtom, (prev: Block) => {
        const position = match<Direction, Position>(direction)
          .with('left', () => ({ row: prev.position.row, col: prev.position.col - 1 }))
          .with('down', () => ({ row: prev.position.row + 1, col: prev.position.col }))
          .with('up', () => ({ row: prev.position.row - 1, col: prev.position.col }))
          .with('right', () => ({ row: prev.position.row, col: prev.position.col + 1 }))
          .exhaustive()
        return {
          ...prev,
          position,
        }
      })
    }, [])
  )

export const blocksActions: BlocksActions = {
  useAddBlock: () =>
    useAtomCallback(
      useCallback((get, set, { addingBlock }) => set(blockAtomsAtom, { type: 'insert', value: addingBlock }), [])
    ),

  useUpdateBlock: () =>
    useAtomCallback(
      useCallback((get, set, { blockId, newProps }) => {
        const blockAtom = get(blockByIdAtom(blockId))
        set(blockAtom, (prev: Block) => ({
          ...prev,
          ...newProps,
        }))
      }, [])
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
