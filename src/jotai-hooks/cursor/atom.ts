import { atom } from 'jotai'
import { Position } from '../blocks/atom'

export type Cursor = {
  position: Position
}

export const cursorAtom = atom<Cursor>({
  position: { row: 10, col: 20 },
})
