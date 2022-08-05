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
  scale: number
}

export const pageConfigAtom = atom<PageConfig>({
  key: RecoilAtomKeys.PAGE,
  default: {
    aspectRatio: 'vertical',
    scale: 1,
  },
})

type PageConfigActions = {
  useChangeAspectRatio: () => (aspectRatio: AspectRatioType) => void
  useChangeScale: () => (scale: number) => void
}

export const pageConfigActions: PageConfigActions = {
  useChangeAspectRatio: () =>
    useRecoilCallback(
      ({ set }) =>
        (aspectRatio: AspectRatioType) => {
          set(pageConfigAtom, (prev) => ({ ...prev, aspectRatio }))
        },
      []
    ),
  useChangeScale: () =>
    useRecoilCallback(({ set }) => (scale: number) => {
      set(pageConfigAtom, (prev) => ({ ...prev, scale }))
    }),
}

type PageConfigSelectors = {
  usePageConfigSelector: () => PageConfig
  useGridNumSelector: () => { rowNum: number; colNum: number }
  useAspectRatioSelector: () => AspectRatioType
  useScaleSelector: () => number
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
    return { rowNum: value.height * 5, colNum: value.width * 5 }
  },
})

const aspectRatioSelector = selector<AspectRatioType>({
  key: RecoilSelectorKeys.PAGE_ASPECT_RATIO,
  get: ({ get }) => get(pageConfigAtom).aspectRatio,
})

const scaleSelector = selector<number>({
  key: RecoilSelectorKeys.PAGE_SCALE,
  get: ({ get }) => get(pageConfigAtom).scale,
})

export const pageConfigSelectors: PageConfigSelectors = {
  usePageConfigSelector: () => useRecoilValue(pageConfigSelector),
  useGridNumSelector: () => useRecoilValue(gridNumSelector),
  useAspectRatioSelector: () => useRecoilValue(aspectRatioSelector),
  useScaleSelector: () => useRecoilValue(scaleSelector),
}
