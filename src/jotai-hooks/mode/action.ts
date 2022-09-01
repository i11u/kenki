import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { Mode, modeAtom } from './atom'

type ModeActions = {
  useSwitchModes: () => (mode: Mode) => void
}

export const modeActions: ModeActions = {
  useSwitchModes: () => useAtomCallback(useCallback((get, set, mode) => set(modeAtom, mode), [])),
}
