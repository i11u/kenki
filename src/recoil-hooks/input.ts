import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'

const inputAtom = atom<string | undefined>({
  key: RecoilAtomKeys.INPUT,
  default: undefined,
})

type InputActions = {
  useSetInputValue: () => (str: string) => void
}

export const inputActions: InputActions = {
  useSetInputValue: () =>
    useRecoilCallback(
      ({ set }) =>
        (str: string) => {
          set(inputAtom, str)
        },
      []
    ),
}

type InputSelectors = {
  useInputValue: () => string | undefined
}

const inputValueSelector = selector<string | undefined>({
  key: RecoilSelectorKeys.INPUT,
  get: ({ get }) => get(inputAtom),
})

export const inputSelectors: InputSelectors = {
  useInputValue: () => useRecoilValue(inputValueSelector),
}
