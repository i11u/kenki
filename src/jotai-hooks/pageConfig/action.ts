import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import { AspectRatioType, pageConfigAtom } from './atom'

type PageConfigActions = {
  useChangeAspectRatio: () => (aspectRatio: AspectRatioType) => void
  useChangeScale: () => (scale: number) => void
}

export const pageConfigActions: PageConfigActions = {
  useChangeAspectRatio: () =>
    useAtomCallback(
      useCallback(
        (get, set, aspectRatio) =>
          set(pageConfigAtom, (prev) => ({
            ...prev,
            aspectRatio,
          })),
        []
      )
    ),
  useChangeScale: () =>
    useAtomCallback(
      useCallback(
        (get, set, scale) =>
          set(pageConfigAtom, (prev) => ({
            ...prev,
            scale,
          })),
        []
      )
    ),
}
