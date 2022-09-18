import { useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { useCallback } from 'react'
import { ColorTheme, colorThemeAtom } from './atom'

type ColorThemeSelector = {
  useColorTheme: () => ColorTheme
}

const useColorThemeSelector = () =>
  useAtomValue(
    selectAtom(
      colorThemeAtom,
      useCallback((ct) => ct, [])
    )
  )

export const colorThemeSelector: ColorThemeSelector = {
  useColorTheme: useColorThemeSelector,
}
