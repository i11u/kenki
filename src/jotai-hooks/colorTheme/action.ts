import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import { ColorTheme, colorThemeAtom, darkColorTheme, normalColorTheme } from './atom'

type ColorThemeActions = {
  useChangeColorTheme: () => ({ colorTheme }: { colorTheme: ColorTheme }) => void
  useToggleColorTheme: () => () => void
}

export const colorThemeActions: ColorThemeActions = {
  useChangeColorTheme: () =>
    useAtomCallback(useCallback((get, set, { colorTheme }) => set(colorThemeAtom, colorTheme), [])),
  useToggleColorTheme: () =>
    useAtomCallback(
      useCallback(
        (get, set) => set(colorThemeAtom, (prev) => (prev === normalColorTheme ? darkColorTheme : normalColorTheme)),
        []
      )
    ),
}
