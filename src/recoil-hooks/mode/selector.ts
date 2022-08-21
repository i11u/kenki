import { selector, useRecoilValue } from 'recoil'
import { modeAtom, ModeType } from './atom'
import { RecoilSelectorKeys } from '../keys'

type ModeSelectors = {
  useCurrentMode: () => ModeType
}

const currentModeSelector = selector<ModeType>({
  key: RecoilSelectorKeys.MODE,
  get: ({ get }) => get(modeAtom).mode,
})

export const modeSelectors: ModeSelectors = {
  useCurrentMode: () => useRecoilValue(currentModeSelector),
}
