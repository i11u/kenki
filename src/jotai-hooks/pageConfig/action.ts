import { useCallback } from 'react'
import { useAtomCallback } from 'jotai/utils'
import { AspectRatioType, pageConfigAtom } from './atom'

type PageConfigActions = {
  useChangeAspectRatio: () => (aspectRatio: AspectRatioType) => void
  useToggleAspectRatio: () => () => void
  useChangeScale: () => (scale: number) => void
  useToggleGridIsVisible: () => () => void
  useToggleBlockBorderIsVisible: () => () => void
  useToggleEditingTitle: () => () => void
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
  useToggleAspectRatio: () =>
    useAtomCallback(
      useCallback(
        (get, set) =>
          set(pageConfigAtom, (prev) => ({
            ...prev,
            aspectRatio: prev.aspectRatio === 'slide' ? 'document' : 'slide',
          })),
        []
      )
    ),
  useChangeScale: () =>
    useAtomCallback(
      useCallback((get, set, scale) => {
        if (scale < 0.5) return
        if (scale >= 2.1) return
        set(pageConfigAtom, (prev) => ({
          ...prev,
          scale,
        }))
      }, [])
    ),
  useToggleGridIsVisible: () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(pageConfigAtom, (prev) => ({
          ...prev,
          grid: !prev.grid,
        }))
      }, [])
    ),
  useToggleBlockBorderIsVisible: () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(pageConfigAtom, (prev) => ({
          ...prev,
          blockBorder: !prev.blockBorder,
        }))
      }, [])
    ),
  useToggleEditingTitle: () =>
    useAtomCallback(
      useCallback((get, set) => {
        set(pageConfigAtom, (prev) => ({
          ...prev,
          editingTitle: !prev.editingTitle,
        }))
      }, [])
    ),
}
