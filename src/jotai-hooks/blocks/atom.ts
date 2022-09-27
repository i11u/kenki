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
  defaultInnerHTML: string
  innerHTML: string
}

/*
 * Ideally, atoms must not be accessible from components but only from custom hooks, such as actions or selectors.
 * TypeScript currently does not have a feature to export "locally", which may be enabled by:
 * https://github.com/microsoft/TypeScript/issues/41316
 * */
export const blocksAtom = atom<Block[]>([
  {
    id: '9a2c0d59-3249-44da-a065-8b95a93306fa',
    page: 0,
    position: {
      row: 6,
      col: 21,
    },
    width: 8,
    height: 1,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML: 'This is 鍵記 (kenki)',
    innerHTML: '',
  },
  {
    id: '95dad9e6-aefc-4668-a692-15c16a1aaf1a',
    page: 0,
    position: {
      row: 10,
      col: 9,
    },
    width: 12,
    height: 4,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML:
      'On Normal mode, you can:<div>- Move cursor by (h/j/k/l)</div><div>- Zoom In/Out (+/-)</div><div>- Scroll over page (H/J/K/L)</div>',
    innerHTML: '',
  },
  {
    id: 'a82c9842-c1b4-462a-afd4-45c34d692ce4',
    page: 0,
    position: {
      row: 10,
      col: 29,
    },
    width: 13,
    height: 6,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML:
      'On Normal mode, you can also:<div>- Insert a text block (t)</div><div>- Show block hints (f)</div><div>- Browse commands (:)</div><div>- Open/Close settings (⌘+,)</div><div>- Open/Close help (⌘+.)</div>',
    innerHTML: '',
  },
  {
    id: '9a976950-9928-48f6-894e-a96a5fe12d26',
    page: 0,
    position: {
      row: 35,
      col: 9,
    },
    width: 21,
    height: 1,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML: 'You can always return to Normal mode by Escape.',
    innerHTML: '',
  },
  {
    id: '5db27e4b-5ac0-4323-9feb-baf94c389300',
    page: 0,
    position: {
      row: 25,
      col: 11,
    },
    width: 5,
    height: 1,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML: 'Edit mode&nbsp;',
    innerHTML: '',
  },
  {
    id: '01b491f1-b441-497d-8760-f2b5ea064ed7',
    page: 0,
    position: {
      row: 24,
      col: 22,
    },
    width: 5,
    height: 1,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML: 'Select mode',
    innerHTML: '',
  },
  {
    id: '7148f562-12f3-4f69-a887-d3161e040258',
    page: 0,
    position: {
      row: 24,
      col: 32,
    },
    width: 5,
    height: 1,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML: 'Edit mode',
    innerHTML: '',
  },
  {
    id: 'e7d08e6f-ddf1-40bc-9c58-a339df45b4bf',
    page: 0,
    position: {
      row: 18,
      col: 17,
    },
    width: 15,
    height: 4,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML:
      'Other hotkeys<div>- Edit mode to Select mode (Ctrl+v)<div>- Select mode to Edit mode (i)</div></div><div>- Edit mode to Insert mode (Ctrl+r)</div>',
    innerHTML: '',
  },
  {
    id: 'd15ca80f-c216-485b-8fc1-fcb9a999932d',
    page: 0,
    position: {
      row: 26,
      col: 22,
    },
    width: 5,
    height: 1,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML: 'Insert mode',
    innerHTML: '',
  },
  {
    id: 'da2ebe9f-9459-47f6-9003-14fe13f73fe1',
    page: 0,
    position: {
      row: 29,
      col: 30,
    },
    width: 9,
    height: 4,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML:
      'Relation is defined by:<div>- start block</div><div>- end block</div><div>- relation label</div>',
    innerHTML: '',
  },
  {
    id: '7be2ed9e-c6f8-4832-8352-7eb304e44876',
    page: 0,
    position: {
      row: 37,
      col: 9,
    },
    width: 31,
    height: 2,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML:
      "Kenki still has very limited features, and there are some bugs & instability.<br>If you have find those, I'm glad if you post them in docs/forum.&nbsp;",
    innerHTML: '',
  },
  {
    id: '19593f2a-e791-456c-a253-8bfba6ca609d',
    page: 0,
    position: {
      row: 40,
      col: 9,
    },
    width: 28,
    height: 2,
    blocks: null,
    isEmpty: false,
    isSelected: false,
    editing: false,
    defaultInnerHTML:
      'docs → <a href="https://scrapbox.io/kenki/%E9%8D%B5%E8%A8%98_(kenki)">https://scrapbox.io/kenki/%E9%8D%B5%E8%A8%98_(kenki)</a><br>forum → <a href="https://scrapbox.io/kenki/forum">https://scrapbox.io/kenki/forum</a><br>',
    innerHTML: '',
  },
])

export const blockAtomsAtom = splitAtom(blocksAtom)

export const blockByIdAtom = (id: string) =>
  atom((get) => get(blockAtomsAtom).find((v) => get(v).id === id) as PrimitiveAtom<Block>)
