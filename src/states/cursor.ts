import { atom, selector, selectorFamily, useRecoilCallback, useRecoilValue } from 'recoil'
import { Position } from '../types/position'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'

export type Cursor = {
  userId: string
  position: Position
}

type Cursors = {
  cursors: Cursor[]
}

const cursorsAtom = atom<Cursors>({
  key: RecoilAtomKeys.CURSOR,
  default: {
    cursors: [
      {
        userId: 'user1',
        position: { row: 0, col: 0 },
      },
    ],
  } as Cursors,
})

type CursorsActions = {
  useAddCursor: () => (cursor: Cursor) => void
  useChangeCursorPosition: () => (userId: string, position: Position) => void
}

export const cursorsActions: CursorsActions = {
  useAddCursor: () =>
    useRecoilCallback(
      ({ set }) =>
        (cursor) => {
          set(cursorsAtom, (prev) => ({
            ...prev,
            cursors: [...prev.cursors, cursor],
          }))
        },
      []
    ),
  useChangeCursorPosition: () =>
    useRecoilCallback(
      ({ set }) =>
        (userId: string, position: Position) => {
          set(cursorsAtom, (prev) => ({
            ...prev,
            cursors: prev.cursors.map((cursor) =>
              cursor.userId === userId
                ? {
                    ...cursor,
                    position,
                  }
                : cursor
            ),
          }))
        },
      []
    ),
}

type CursorsSelectors = {
  useCursors: () => Cursor[]
  useCursorById: (userId: string) => Cursor | undefined
}

const cursorSelector = selector<Cursor[]>({
  key: RecoilSelectorKeys.CURSORS,
  get: ({ get }) => get(cursorsAtom).cursors,
})

const cursorByIdSelector = selectorFamily<Cursor | undefined, string>({
  key: RecoilSelectorKeys.CURSOR_BY_ID,
  get:
    (userId) =>
    ({ get }) => {
      const { cursors } = get(cursorsAtom)
      return cursors.find((v) => v.userId === userId)
    },
})

export const cursorsSelectors: CursorsSelectors = {
  useCursors: () => useRecoilValue(cursorSelector),
  useCursorById: (userId: string) => useRecoilValue(cursorByIdSelector(userId)),
}
