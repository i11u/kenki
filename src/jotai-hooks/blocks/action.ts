import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { match } from 'ts-pattern'
import { Block, blockAtomsAtom, blockByIdAtom, blocksAtom, Position } from './atom'

type BlocksActions = {
  useAddBlock: () => ({ block }: { block: Block }) => void
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

export type Direction = 'left' | 'down' | 'up' | 'right'

export const useCreateBlock = (): ((block: Block) => void) =>
  useAtomCallback(useCallback((get, set, block: Block) => set(blockAtomsAtom, { type: 'insert', value: block }), []))

export const useRemoveBlock = (): ((blockId: string) => void) =>
  useAtomCallback(
    useCallback((get, set, blockId) => {
      const newBlocks = get(blocksAtom).filter((block) => block.id !== blockId)
      set(blocksAtom, newBlocks)
    }, [])
  )

export const useRemoveAllBlocks = (): (() => void) =>
  useAtomCallback(
    useCallback((get, set) => {
      set(blocksAtom, [])
    }, [])
  )

export const useUpdateInnerHTML = (): (({ blockId, innerHTML }: { blockId: string; innerHTML: string }) => void) =>
  useAtomCallback(
    useCallback((get, set, { blockId, innerHTML }) => {
      const blockAtom = get(blockByIdAtom(blockId))
      set(blockAtom, (prev: Block) => ({
        ...prev,
        innerHTML,
      }))
    }, [])
  )

export const useMoveBlock = (): (({
  blockId,
  direction,
  offset,
}: {
  blockId: string
  direction: Direction
  offset: number
}) => void) =>
  useAtomCallback(
    useCallback((get, set, { blockId, direction, offset }) => {
      const blockAtom = get(blockByIdAtom(blockId))
      set(blockAtom, (prev: Block) => {
        const position = match<Direction, Position>(direction)
          .with('left', () => ({ row: prev.position.row, col: prev.position.col - offset }))
          .with('down', () => ({ row: prev.position.row + offset, col: prev.position.col }))
          .with('up', () => ({ row: prev.position.row - offset, col: prev.position.col }))
          .with('right', () => ({ row: prev.position.row, col: prev.position.col + offset }))
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
    useAtomCallback(useCallback((get, set, { block }) => set(blockAtomsAtom, { type: 'insert', value: block }), [])),

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
