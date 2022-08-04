import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { AspectRatio } from '../types/editor'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'

type PageConfig = {
  aspectRatio: AspectRatio
}

const pageConfigAtom = atom<PageConfig>({
  key: RecoilAtomKeys.PAGE,
  default: {
    aspectRatio: 'a4',
  },
})

type PageConfigActions = {
  useChangeAspectRatio: () => (aspectRatio: AspectRatio) => void
}

export const pageConfigAction: PageConfigActions = {
  useChangeAspectRatio: () =>
    useRecoilCallback(
      ({ set }) =>
        (aspectRatio: AspectRatio) => {
          set(pageConfigAtom, (prev) => ({ ...prev, aspectRatio }))
        },
      []
    ),
}

type PageConfigSelectors = {
  usePageConfig: () => PageConfig
}

const pageConfigSelector = selector<PageConfig>({
  key: RecoilSelectorKeys.PAGE_CONFIG,
  get: ({ get }) => get(pageConfigAtom),
})

export const pageConfigSelectors: PageConfigSelectors = {
  usePageConfig: () => useRecoilValue(pageConfigSelector),
}
