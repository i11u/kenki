import { atom } from 'recoil'
import { RecoilAtomKeys } from '../keys'

export type ModeType = 'NORMAL' | 'EDIT' | 'SELECT' | 'COMMAND'
export type Mode = { mode: ModeType }

export const modeAtom = atom<Mode>({
  key: RecoilAtomKeys.MODE,
  default: { mode: 'NORMAL' },
})
