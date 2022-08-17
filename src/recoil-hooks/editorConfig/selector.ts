import { selector, useRecoilValue } from 'recoil'
import { RecoilSelectorKeys } from '../keys'
import { EditorConfig, editorConfigAtom, SidebarConfig } from './atom'

type EditorConfigSelectors = {
  useEditorConfig: () => EditorConfig
  useSidebarConfig: () => SidebarConfig
  useSidebarIsOpen: () => boolean | undefined
}

const editorConfigSelector = selector<EditorConfig>({
  key: RecoilSelectorKeys.EDITOR_CONFIG,
  get: ({ get }) => get(editorConfigAtom),
})

const sidebarConfigSelector = selector<SidebarConfig>({
  key: RecoilSelectorKeys.SIDEBAR_CONFIG,
  get: ({ get }) => get(editorConfigAtom).sidebarConfig,
})

const sidebarIsOpenSelector = selector<boolean | undefined>({
  key: RecoilSelectorKeys.SIDEBAR_ISOPEN,
  get: ({ get }) => get(editorConfigAtom).sidebarConfig.isOpen,
})

export const editorConfigSelectors: EditorConfigSelectors = {
  useEditorConfig: () => useRecoilValue(editorConfigSelector),
  useSidebarConfig: () => useRecoilValue(sidebarConfigSelector),
  useSidebarIsOpen: () => useRecoilValue(sidebarIsOpenSelector),
}
