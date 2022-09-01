import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { editorConfigAtom, FontFamily, SidebarConfig } from './atom'

type EditorConfigActions = {
  useChangeFontFamily: () => (fontFamily: FontFamily) => void
  useToggleHeader: () => () => void
  useToggleSidebar: () => () => void
  useSwitchSidebarPosition: () => () => void
}

export const editorConfigActions: EditorConfigActions = {
  useChangeFontFamily: () =>
    useAtomCallback(
      useCallback((get, set, fontFamily) => {
        set(editorConfigAtom, (prev) => ({
          ...prev,
          fontFamily,
        }))
      }, [])
    ),
  useToggleHeader: () =>
    useAtomCallback(
      useCallback(
        (get, set) =>
          set(editorConfigAtom, (prev) => ({
            ...prev,
            headerConfig: prev.headerConfig.display === 'open' ? { display: 'closed' } : { display: 'open' },
          })),
        []
      )
    ),
  useToggleSidebar: () =>
    useAtomCallback(
      useCallback(
        (get, set) =>
          set(editorConfigAtom, (prev) => {
            const sidebarConfig = {
              ...prev.sidebarConfig,
              isOpen: prev.sidebarConfig.isOpen === undefined || !prev.sidebarConfig.isOpen,
            }
            return {
              ...prev,
              sidebarConfig,
            }
          }),
        []
      )
    ),
  useSwitchSidebarPosition: () =>
    useAtomCallback(
      useCallback(
        (get, set) =>
          set(editorConfigAtom, (prev) => {
            const sidebarConfig: SidebarConfig = {
              ...prev.sidebarConfig,
              position: prev.sidebarConfig.position === 'right' ? 'left' : 'right',
            }
            return {
              ...prev,
              sidebarConfig,
            }
          }),
        []
      )
    ),
}
