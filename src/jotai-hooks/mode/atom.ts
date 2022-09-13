import { atom } from 'jotai'

export type Mode = 'CURSOR' | 'EDIT' | 'COMMAND' | 'SELECT' | 'MULTISELECT' | 'BLOCKHINT' | 'INSERT'

export const modeAtom = atom<Mode>('CURSOR')
