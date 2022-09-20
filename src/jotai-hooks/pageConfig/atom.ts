import { atom } from 'jotai'
import { match } from 'ts-pattern'

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
  grid: boolean
  blockBorder: boolean
}

export const pageConfigAtom = atom<PageConfig>({
  aspectRatio: 'slide',
  scale: 1,
  grid: true,
  blockBorder: true,
})
