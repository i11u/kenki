import { atom } from 'jotai'

export type Mode =
  | 'NORMAL'
  | 'EDIT'
  | 'COMMAND'
  | 'SELECT'
  | 'MULTISELECT'
  | 'BLOCKHINT'
  | 'INSERT'
  | 'SETTINGS'
  | 'HELP'

export const modeAtom = atom<Mode>('NORMAL')
