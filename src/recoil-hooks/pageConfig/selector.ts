import { selector, useRecoilValue } from 'recoil'
import { AspectRatioType, aspectRatioValue, PageConfig, pageConfigAtom } from './atom'
import { RecoilSelectorKeys } from '../keys'

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
