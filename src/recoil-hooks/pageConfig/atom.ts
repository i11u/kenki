import { atom } from 'recoil'
import { match } from 'ts-pattern'

import { RecoilAtomKeys } from '../keys'

export type AspectRatio = { width: number; height: number }

export type AspectRatioType = 'document' | 'slide' | 'full-screen'

export function aspectRatioValue(t: AspectRatioType): AspectRatio {
  return match<AspectRatioType, AspectRatio>(t)
    .with('document', () => ({ width: 10, height: 14 }))
    .with('slide', () => ({ width: 16, height: 9 }))
    .with('full-screen', () => ({ width: 0, height: 0 }))
    .exhaustive()
}

export type PageConfig = {
  aspectRatio: AspectRatioType
  scale: number
}

export const pageConfigAtom = atom<PageConfig>({
  key: RecoilAtomKeys.PAGE,
  default: {
    aspectRatio: 'slide',
    scale: 1,
  },
})
