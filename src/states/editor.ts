import { atom, selector, useRecoilCallback, useRecoilValue } from 'recoil'
import { RecoilAtomKeys, RecoilSelectorKeys } from './keys'
import { FontFamily, HeadeConfig, SidebarConfig } from '../types/editor'

type EditorConfig = {
  fontFamily: string
  headerConfig: HeadeConfig
  sidebarConfig: SidebarConfig
}

const editorConfigAtom = atom<EditorConfig>({
  key: RecoilAtomKeys.EDITOR,
  default: {
    fontFamily: '凸版文久ゴシック',
    headerConfig: { display: 'open' },
    sidebarConfig: { display: 'initial', position: 'left' },
  },
})

type EditorConfigActions = {
  useChangeFontFamily: () => (fontFamily: FontFamily) => void
  useToggleHeader: () => () => void
  useToggleSidebar: () => () => void
  useSwitchSidebarPosition: () => () => void
}

export const editorConfigActions: EditorConfigActions = {
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
            const headerConfig: HeadeConfig =
              prev.headerConfig.display === 'open' ? { display: 'closed' } : { display: 'open' }
            return {
              ...prev,
              headerConfig,
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
            const sidebarConfig: SidebarConfig = {
              ...prev.sidebarConfig,
              display:
                prev.sidebarConfig.display === 'closed' || prev.sidebarConfig.display === 'initial' ? 'open' : 'closed',
            }
            return { ...prev, sidebarConfig }
          })
        },
      []
    ),
  useSwitchSidebarPosition: () =>
    useRecoilCallback(
      ({ set }) =>
        () => {
          set(editorConfigAtom, (prev) => {
            const sidebarConfig: SidebarConfig =
              prev.sidebarConfig.position === 'left'
                ? {
                    ...prev.sidebarConfig,
                    position: 'right',
                  }
                : {
                    ...prev.sidebarConfig,
                    position: 'left',
                  }
            return {
              ...prev,
              sidebarConfig,
            }
          })
        },
      []
    ),
}

type EditorConfigSelectors = {
  useEditorConfig: () => EditorConfig
  useSidebarConfig: () => SidebarConfig
  useSidebarDisplay: () => string
}

const editorConfigSelector = selector<EditorConfig>({
  key: RecoilSelectorKeys.EDITOR_CONFIG,
  get: ({ get }) => get(editorConfigAtom),
})

const sidebarConfigSelector = selector<SidebarConfig>({
  key: RecoilSelectorKeys.SIDEBAR_CONFIG,
  get: ({ get }) => get(editorConfigAtom).sidebarConfig,
})

const sidebarDisplaySelector = selector<string>({
  key: RecoilSelectorKeys.SIDEBAR_DISPLAY,
  get: ({ get }) => get(editorConfigAtom).sidebarConfig.display,
})

export const editorConfigSelectors: EditorConfigSelectors = {
  useEditorConfig: () => useRecoilValue(editorConfigSelector),
  useSidebarConfig: () => useRecoilValue(sidebarConfigSelector),
  useSidebarDisplay: () => useRecoilValue(sidebarDisplaySelector),
}
