import { atom, selector, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil'
import { Position } from '../types/position'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'
import { Block } from './block'
import { emptyBlock } from '../utils/block'

export type UnsettledBlock = {
  userId: string
  block: Block
}

type UnsettledBlocks = {
  unsettledBlocks: UnsettledBlock[]
}

const unsettledBlockAtom = atom<UnsettledBlocks>({
  key: RecoilAtomKeys.UNSETTLED_BLOCK,
  default: {
    unsettledBlocks: [
      {
        userId: 'user1',
        block: emptyBlock({ id: '9999', position: { row: 0, col: 0 } }),
      },
    ],
  },
})

type UnsettledBlockAction = {
  useAddUnsettledBlock: () => (unsettledBlock: UnsettledBlock) => void
  useChangeUnsettledBlockPos: () => (userId: string, position: Position) => void
  useUnsettledBlockSize: () => (userId: string, width: number, height: number) => void
}

export const unsettledBlockAction: UnsettledBlockAction = {
  useAddUnsettledBlock: () =>
    useRecoilCallback(
      ({ set }) =>
        (unsettledBlock) => {
          set(unsettledBlockAtom, (prev) => ({
            ...prev,
            unsettledBlocks: [...prev.unsettledBlocks, unsettledBlock],
          }))
        },
      []
    ),
  useChangeUnsettledBlockPos: () =>
    useRecoilCallback(
      ({ set }) =>
        (userId: string, position: Position) => {
          set(unsettledBlockAtom, (prev) => ({
            ...prev,
            unsettledBlocks: prev.unsettledBlocks.map((unsettledBlock) =>
              unsettledBlock.userId === userId
                ? ({
                    userId,
                    block: {
                      ...unsettledBlock.block,
                      position,
                    },
                  } as UnsettledBlock)
                : unsettledBlock
            ),
          }))
        },
      []
    ),
  useUnsettledBlockSize: () =>
    useRecoilCallback(
      ({ set }) =>
        (userId: string, width: number, height: number) => {
          set(unsettledBlockAtom, (prev) => ({
            ...prev,
            unsettledBlocks: prev.unsettledBlocks.map((unsettledBlock) =>
              unsettledBlock.userId === userId
                ? ({
                    userId,
                    block: {
                      ...unsettledBlock.block,
                      width,
                      height,
                    },
                  } as UnsettledBlock)
                : unsettledBlock
            ),
          }))
        },
      []
    ),
}

type UnsettledBlockSelectors = {
  useUnsettledBlocks: () => UnsettledBlock[]
  useUnsettledBlockById: (userId: string) => UnsettledBlock | undefined
}

const unsettledBlocksSelector = selector<UnsettledBlock[]>({
  key: RecoilSelectorKeys.UNSETTLED_BLOCKS,
  get: ({ get }) => get(unsettledBlockAtom).unsettledBlocks,
})

const unsettledBlockByIdSelector = selectorFamily<UnsettledBlock | undefined, string>({
  key: RecoilSelectorKeys.UNSETTLED_BLOCK_BY_ID,
  get:
    (userId) =>
    ({ get }) => {
      const { unsettledBlocks } = get(unsettledBlockAtom)
      return unsettledBlocks.find((v) => v.userId === userId)
    },
})

export const unsettledBlockSelectors: UnsettledBlockSelectors = {
  useUnsettledBlocks: () => useRecoilValue(unsettledBlocksSelector),
  useUnsettledBlockById: (userId: string) => useRecoilValue(unsettledBlockByIdSelector(userId)),
}
