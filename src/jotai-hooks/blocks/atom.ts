import { atom, PrimitiveAtom } from 'jotai'
import { splitAtom } from 'jotai/utils'

export type Position = {
  row: number
  col: number
}

/**
 * Type definition of Block.
 * Block can be of Text, Image, Drawing, etc.
 * */
export type Block = {
  id: string
  page: number
  position: Position
  width: number
  height: number
  blocks: Block[] | null
  isEmpty: boolean
  isSelected: boolean
  editing: boolean
}

/**
 * Type definition of multiple Blocks
 * */
export type Blocks = Block[]

/*
 * Ideally, atoms must not be accessible from components but only from custom hooks, such as actions or selectors.
 * TypeScript currently does not have a feature to export "locally", which may be enabled by:
 * https://github.com/microsoft/TypeScript/issues/41316
 * */
export const blocksAtom = atom<Blocks>([])

export const blockAtomsAtom = splitAtom(blocksAtom)

export const blockByIdAtom = (id: string) =>
  atom((get) => get(blockAtomsAtom).find((v) => get(v).id === id) as PrimitiveAtom<Block>)
