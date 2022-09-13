import { PrimitiveAtom, useAtomValue } from 'jotai'
import { Relation, relationAtomsAtom } from './atom'

type RelationSelectors = {
  useRelationAtoms: () => PrimitiveAtom<Relation>[]
}

const useRelationAtomsSelector = () => useAtomValue(relationAtomsAtom)

export const relationSelectors: RelationSelectors = {
  useRelationAtoms: useRelationAtomsSelector,
}
