import { useRecoilCallback } from 'recoil'
import { modeAtom, ModeType } from './atom'

type ModeActions = {
  useSwitchModes: () => (mode: ModeType) => void
}

export const modeActions: ModeActions = {
  useSwitchModes: () =>
    useRecoilCallback(({ set }) => (mode: ModeType) => {
      set(modeAtom, { mode })
    }),
}
