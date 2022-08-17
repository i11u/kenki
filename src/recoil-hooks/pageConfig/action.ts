import { useRecoilCallback } from 'recoil'
import { AspectRatioType, pageConfigAtom } from './atom'

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
