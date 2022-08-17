import { useRecoilCallback } from 'recoil'
import { editorConfigAtom, FontFamily, HeaderConfig, SidebarConfig } from './atom'

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
            const headerConfig: HeaderConfig =
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
              isOpen: prev.sidebarConfig.isOpen === undefined || !prev.sidebarConfig.isOpen,
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
