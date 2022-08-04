import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { match } from 'ts-pattern'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'

export type AspectRatio = { width: number; height: number }

export type AspectRatioType = 'vertical' | 'slide' | 'full-screen'

export function aspectRatioValue(t: AspectRatioType): AspectRatio {
  return match<AspectRatioType, AspectRatio>(t)
    .with('vertical', () => ({ width: 10, height: 14 }))
    .with('slide', () => ({ width: 16, height: 9 }))
    .with('full-screen', () => ({ width: 0, height: 0 }))
    .exhaustive()
}

export type PageConfig = {
  aspectRatio: AspectRatioType
}

const pageConfigAtom = atom<PageConfig>({
  key: RecoilAtomKeys.PAGE,
  default: {
    aspectRatio: 'slide',
  },
})

type PageConfigActions = {
  useChangeAspectRatio: () => (aspectRatio: AspectRatioType) => void
}

export const pageConfigAction: PageConfigActions = {
  useChangeAspectRatio: () =>
    useRecoilCallback(
      ({ set }) =>
        (aspectRatio: AspectRatioType) => {
          set(pageConfigAtom, (prev) => ({ ...prev, aspectRatio }))
        },
      []
    ),
}

type PageConfigSelectors = {
  usePageConfigSelector: () => PageConfig
  useGridNumSelector: () => { rowNum: number; colNum: number }
}

const pageConfigSelector = selector<PageConfig>({
  key: RecoilSelectorKeys.PAGE_CONFIG,
  get: ({ get }) => get(pageConfigAtom),
})

const gridNumSelector = selector<{ rowNum: number; colNum: number }>({
  key: RecoilSelectorKeys.PAGE_GRID_NUM,
  get: ({ get }) => {
    const { aspectRatio } = get(pageConfigAtom)
    const value = aspectRatioValue(aspectRatio)
    return { rowNum: value.height * 4, colNum: value.width * 4 }
  },
})

export const pageConfigSelectors: PageConfigSelectors = {
  usePageConfigSelector: () => useRecoilValue(pageConfigSelector),
  useGridNumSelector: () => useRecoilValue(gridNumSelector),
}
