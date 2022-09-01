import { atom, useAtomValue } from 'jotai'
import { selectAtom, useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'

const inputAtom = atom<string | undefined>(undefined)

type InputActions = {
  useSetInputValue: () => (str: string) => void
}

export const inputActions: InputActions = {
  useSetInputValue: () => useAtomCallback(useCallback((get, set, str) => set(inputAtom, str), [])),
}

type InputSelectors = {
  useInputValue: () => string | undefined
}

const useInputValueSelector = () =>
  useAtomValue<string | undefined>(
    selectAtom(
      inputAtom,
      useCallback((value) => value, [])
    )
  )

export const inputSelectors: InputSelectors = {
  useInputValue: useInputValueSelector,
}
