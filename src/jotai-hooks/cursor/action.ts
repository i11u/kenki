import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { match } from 'ts-pattern'
import { Position } from '../blocks/atom'
import { Cursor, cursorAtom } from './atom'
import { Direction } from '../blocks/action'

export type CursorAction = {
  useChangeCursorPosition: () => (position: Position) => void
}

export const useMoveCursor = (): (({ direction, offset }: { direction: Direction; offset: number }) => void) =>
  useAtomCallback(
    useCallback((get, set, { direction, offset }) => {
      set(cursorAtom, (prev: Cursor) => {
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

export const useMoveCursorByPosition = (): ((position: Position) => void) =>
  useAtomCallback(
    useCallback((get, set, position) => {
      set(cursorAtom, (prev: Cursor) => ({
        ...prev,
        position,
      }))
    }, [])
  )

export const cursorAction: CursorAction = {
  useChangeCursorPosition: () =>
    useAtomCallback(
      useCallback((get, set, position: Position) => set(cursorAtom, (prev) => ({ ...prev, position })), [])
    ),
}
