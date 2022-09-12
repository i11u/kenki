import { atom } from 'jotai'

export type Mode = 'NORMAL' | 'EDIT' | 'COMMAND' | 'SELECT' | 'MULTISELECT' | 'BLOCKHINT' | 'INSERT'

export const modeAtom = atom<Mode>('NORMAL')
