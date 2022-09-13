import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { Relation, relationAtomById, relationAtomsAtom } from './atom'

type RealtionActions = {
  useAddRelation: () => ({ relation }: { relation: Relation }) => void
  useChangeRelationStatus: () => ({
    relationId,
    isSelected,
    editing,
  }: {
    relationId: string
    isSelected: boolean
    editing: boolean
  }) => void
}

export const relationActions: RealtionActions = {
  useAddRelation: () =>
    useAtomCallback(
      useCallback((get, set, { relation }) => {
        set(relationAtomsAtom, { type: 'insert', value: relation })
      }, [])
    ),

  useChangeRelationStatus: () =>
    useAtomCallback(
      useCallback((get, set, { relationId, isSelected, editing }) => {
        const relationAtom = get(relationAtomById(relationId))
        set(relationAtom, (prev) => ({
          ...prev,
          isSelected,
          editing,
        }))
      }, [])
    ),
}
