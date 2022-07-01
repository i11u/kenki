/**
 * Type definition of User.
 * */
import { atom, selectorFamily } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'

export type User = {
  id: string
}

const userAtom = atom<User>({
  key: RecoilAtomKeys.USER,
  default: {
    id: 'user1',
  },
})

export const useUserSelector = selectorFamily<User | undefined, string>({
  key: RecoilSelectorKeys.USER,
  get:
    (userId) =>
    ({ get }) => {
      const user = get(userAtom)
      return userId === user.id ? user : undefined
    },
})
