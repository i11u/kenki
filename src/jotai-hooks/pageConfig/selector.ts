import { useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { useCallback } from 'react'
import { AspectRatioType, aspectRatioValue, PageConfig, pageConfigAtom } from './atom'

type PageConfigSelectors = {
  usePageConfig: () => PageConfig
  useGridNum: () => { rowNum: number; colNum: number }
  useAspectRatio: () => AspectRatioType
  usePageScale: () => number
}
const usePageConfigSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config, [])
    )
  )

const useGridNumSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback(
        (config) => ({
          rowNum: aspectRatioValue(config.aspectRatio).height * 5,
          colNum: aspectRatioValue(config.aspectRatio).width * 5,
        }),
        []
      )
    )
  )

const useAspectRatioSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.aspectRatio, [])
    )
  )

const usePageScaleSelector = () =>
  useAtomValue(
    selectAtom(
      pageConfigAtom,
      useCallback((config) => config.scale, [])
    )
  )

export const pageConfigSelectors: PageConfigSelectors = {
  usePageConfig: usePageConfigSelector,
  useGridNum: useGridNumSelector,
  useAspectRatio: useAspectRatioSelector,
  usePageScale: usePageScaleSelector,
}