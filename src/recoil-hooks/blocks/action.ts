import { useRecoilCallback } from 'recoil'
import { Block, blocksAtom, Position } from './atom'

type BlocksActions = {
  useAddBlock: () => (block: Block) => void
  useChangeBlockPosition: () => (blockId: string, position: Position) => void
  useChangeBlockSize: () => (blockId: string, width: number, height: number) => void
  useChangeBlockStatus: () => (blockId: string, isEmpty: boolean, isSelected: boolean, editing: boolean) => void
}

export const blocksActions: BlocksActions = {
  useAddBlock: () =>
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
  useChangeBlockPosition: () =>
    useRecoilCallback(
      ({ set }) =>
        (blockId: string, position: Position) => {
          set(blocksAtom, (prev) => ({
            ...prev,
            blocks: prev.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    position,
                  }
                : block
            ),
          }))
        },
      []
    ),
  useChangeBlockSize: () =>
    useRecoilCallback(
      ({ set }) =>
        (blockId: string, width: number, height: number) => {
          set(blocksAtom, (prev) => ({
            ...prev,
            blocks: prev.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    width,
                    height,
                  }
                : block
            ),
          }))
        },
      []
    ),
  useChangeBlockStatus: () =>
    useRecoilCallback(
      ({ set }) =>
        (blockId, isEmpty, isSelected, editing) => {
          set(blocksAtom, (prev) => ({
            ...prev,
            blocks: prev.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    isEmpty,
                    isSelected,
                    editing,
                  }
                : block
            ),
          }))
        },
      []
    ),
}
