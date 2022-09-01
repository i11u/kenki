import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { selectAtom } from 'jotai/utils'
import { Mode, modeAtom } from './atom'

type ModeSelectors = {
  useCurrentMode: () => Mode
}

const useCurrentModeSelector = () =>
  useAtomValue<Mode>(
    selectAtom(
      modeAtom,
      useCallback((mode) => mode, [])
    )
  )

export const modeSelectors: ModeSelectors = {
  useCurrentMode: useCurrentModeSelector,
}
