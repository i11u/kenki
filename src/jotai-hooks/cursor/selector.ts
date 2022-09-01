import { selectAtom, useAtomValue } from 'jotai/utils'
import { useCallback } from 'react'
import { cursorAtom } from './atom'
import { Position } from '../blocks/atom'

export type CursorSelector = {
  useCursorPosition: () => Position
}

export const useCursorPositionSelector = () =>
  useAtomValue<Position>(
    selectAtom(
      cursorAtom,
      useCallback((config) => config.position, [])
    )
  )

export const cursorSelector = {
  useCursorPosition: useCursorPositionSelector,
}
