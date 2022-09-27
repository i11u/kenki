import { atom, PrimitiveAtom } from 'jotai'
import { splitAtom } from 'jotai/utils'

export type RelationOrient = 'inward' | 'outward'
export type RelationType = 'normal' | 'thick'

/**
 * Type definition of Relation between objects, i.e., blocks.
 * */
export type Relation = {
  id: string
  orient: RelationOrient
  type: RelationType
  startBlockId: string | undefined
  endBlockId: string | undefined
  isSelected: boolean
  editing: boolean
  label: string
  scale: number
}

/*
 * Ideally, atoms must not be accessible from components but only from custom hooks, such as actions or selectors.
 * TypeScript currently does not have a feature to export "locally", which may be enabled by:
 * https://github.com/microsoft/TypeScript/issues/41316
 *
 * Updates on 2022/09/13: Eslint can constrain module imports/exports from/to proper domains. Should give it a try.
 * */
export const relationsAtom = atom<Relation[]>([])

export const relationAtomsAtom = splitAtom(relationsAtom)

export const relationAtomById = (id: string) =>
  atom((get) => get(relationAtomsAtom).find((v) => get(v).id === id) as PrimitiveAtom<Relation>)
