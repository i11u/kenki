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
export const relationsAtom = atom<Relation[]>([
  {
    id: '881b329a-20f7-48fa-872b-6cfce7335ee2',
    orient: 'outward',
    type: 'normal',
    startBlockId: '5db27e4b-5ac0-4323-9feb-baf94c389300',
    endBlockId: '01b491f1-b441-497d-8760-f2b5ea064ed7',
    isSelected: false,
    editing: false,
    label: 'Ctrl + v',
    scale: 1,
  },
  {
    id: 'ee83d8cc-5dce-4342-9795-ed7dbeb9a50b',
    orient: 'outward',
    type: 'normal',
    startBlockId: '01b491f1-b441-497d-8760-f2b5ea064ed7',
    endBlockId: '7148f562-12f3-4f69-a887-d3161e040258',
    isSelected: false,
    editing: false,
    label: 'i',
    scale: 1,
  },
  {
    id: '871d9d54-fd37-456a-a972-78cae54657fd',
    orient: 'outward',
    type: 'normal',
    startBlockId: '5db27e4b-5ac0-4323-9feb-baf94c389300',
    endBlockId: 'd15ca80f-c216-485b-8fc1-fcb9a999932d',
    isSelected: false,
    editing: false,
    label: 'Ctrl + r',
    scale: 1,
  },
  {
    id: '9cea9a49-a014-4e39-b703-24eb3c70c6f5',
    orient: 'outward',
    type: 'thick',
    startBlockId: 'd15ca80f-c216-485b-8fc1-fcb9a999932d',
    endBlockId: 'da2ebe9f-9459-47f6-9003-14fe13f73fe1',
    isSelected: false,
    editing: false,
    label: 'You can insert a relaton',
    scale: 1,
  },
])

export const relationAtomsAtom = splitAtom(relationsAtom)

export const relationAtomById = (id: string) =>
  atom((get) => get(relationAtomsAtom).find((v) => get(v).id === id) as PrimitiveAtom<Relation>)
