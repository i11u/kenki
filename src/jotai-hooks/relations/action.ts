import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { Relation, relationAtomById, relationAtomsAtom, relationsAtom } from './atom'

type RealtionActions = {
  useAddRelation: () => ({ relation }: { relation: Relation }) => void
  useChangeRelationStatus: () => ({
    relationId,
    isSelected,
    editing,
    scale,
  }: {
    relationId: string
    isSelected: boolean
    editing: boolean
    scale: number
  }) => void
}

export const useRemoveRelation = (): ((relationId: string) => void) =>
  useAtomCallback(
    useCallback((get, set, relationId: string) => {
      const relationAtom = get(relationAtomById(relationId))
      set(relationAtomsAtom, { type: 'remove', atom: relationAtom })
    }, [])
  )

export const useRemoveAllRelations = (): (() => void) =>
  useAtomCallback(
    useCallback((get, set) => {
      set(relationsAtom, [])
    }, [])
  )

export const useUpdateLabelInRelation = (): (({ relationId, label }: { relationId: string; label: string }) => void) =>
  useAtomCallback(
    useCallback((get, set, { relationId, label }) => {
      const relationAtom = get(relationAtomById(relationId))
      set(relationAtom, (prev: Relation) => ({
        ...prev,
        label,
      }))
    }, [])
  )

export const relationActions: RealtionActions = {
  useAddRelation: () =>
    useAtomCallback(
      useCallback((get, set, { relation }) => {
        set(relationAtomsAtom, { type: 'insert', value: relation })
      }, [])
    ),

  useChangeRelationStatus: () =>
    useAtomCallback(
      useCallback((get, set, { relationId, isSelected, editing, scale }) => {
        const relationAtom = get(relationAtomById(relationId))
        set(relationAtom, (prev) => ({
          ...prev,
          isSelected,
          editing,
          scale,
        }))
      }, [])
    ),
}
