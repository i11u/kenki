import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'
import { Dominant, FontFamily, Header, Sidebar } from '../types/editor'

/*
 * TODO: In Recoil, components subscribing any selector will re-render itself whenever a related atom changes.
 *  To optimize the performance, fine atoms are better.
 * */

type EditorConfig = {
  fontFamily: string
  header: Header
  sidebar: Sidebar
  dominant: Dominant
}

const editorConfigAtom = atom<EditorConfig>({
  key: RecoilAtomKeys.EDITOR,
  default: {
    fontFamily: '凸版文久ゴシック',
    header: 'open',
    sidebar: 'open',
    dominant: 'right',
  },
})

type EditorConfigActions = {
  useChangeFontFamily: () => (fontFamily: FontFamily) => void
  useToggleHeader: () => () => void
  useToggleSidebar: () => () => void
  useToggleDominant: () => () => void
}

const editorConfigAction: EditorConfigActions = {
  useChangeFontFamily: () =>
    useRecoilCallback(
      ({ set }) =>
        (fontFamily: FontFamily) => {
          set(editorConfigAtom, (prev) => ({ ...prev, fontFamily }))
        },
      []
    ),
  useToggleHeader: () =>
    useRecoilCallback(
      ({ set }) =>
        () => {
          set(editorConfigAtom, (prev) => {
            const header: Header = prev.header === 'open' ? 'hidden' : 'open'
            return {
              ...prev,
              header,
            }
          })
        },
      []
    ),
  useToggleSidebar: () =>
    useRecoilCallback(
      ({ set }) =>
        () => {
          set(editorConfigAtom, (prev) => {
            const sidebar: Sidebar = prev.sidebar === 'open' ? 'hidden' : 'open'
            return {
              ...prev,
              sidebar,
            }
          })
        },
      []
    ),
  useToggleDominant: () =>
    useRecoilCallback(
      ({ set }) =>
        () => {
          set(editorConfigAtom, (prev) => {
            const dominant: Dominant = prev.dominant === 'left' ? 'right' : 'left'
            return {
              ...prev,
              dominant,
            }
          })
        },
      []
    ),
}

type EditorConfigSelectors = {
  useEditorConfig: () => EditorConfig
}

const editorConfigSelector = selector<EditorConfig>({
  key: RecoilSelectorKeys.EDITOR_CONFIG,
  get: ({ get }) => get(editorConfigAtom),
})

export const editorSelectors: EditorConfigSelectors = {
  useEditorConfig: () => useRecoilValue(editorConfigSelector),
}
