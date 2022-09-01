import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { Position } from '../blocks/atom'
import { cursorAtom } from './atom'

export type CursorAction = {
  useChangeCursorPosition: () => (position: Position) => void
}

export const cursorAction: CursorAction = {
  useChangeCursorPosition: () =>
    useAtomCallback(
      useCallback((get, set, position: Position) => set(cursorAtom, (prev) => ({ ...prev, position })), [])
    ),
}
