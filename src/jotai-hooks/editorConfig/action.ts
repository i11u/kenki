import { useAtomCallback } from 'jotai/utils'
import { useCallback } from 'react'
import { editorConfigAtom, FontFamily } from './atom'

type EditorConfigActions = {
  useChangeFontFamily: () => (fontFamily: FontFamily) => void
  useToggleHeader: () => () => void
  useToggleSidebarLeft: () => () => void
  useToggleSidebarRight: () => () => void
  useToggleSeparationIsVisible: () => () => void
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
  useToggleSidebarLeft: () =>
    useAtomCallback(
      useCallback(
        (get, set) =>
          set(editorConfigAtom, (prev) => {
            const sidebarLeftConfig = {
              isOpen: prev.sidebarLeftConfig.isOpen === undefined || !prev.sidebarLeftConfig.isOpen,
            }
            return {
              ...prev,
              sidebarLeftConfig,
            }
          }),
        []
      )
    ),
  useToggleSidebarRight: () =>
    useAtomCallback(
      useCallback(
        (get, set) =>
          set(editorConfigAtom, (prev) => {
            const sidebarRightConfig = {
              isOpen: prev.sidebarRightConfig.isOpen === undefined || !prev.sidebarRightConfig.isOpen,
            }
            return {
              ...prev,
              sidebarRightConfig,
            }
          }),
        []
      )
    ),
  useToggleSeparationIsVisible: () =>
    useAtomCallback(
      useCallback(
        (get, set) =>
          set(editorConfigAtom, (prev) => ({
            ...prev,
            separationIsVisible: !prev.separationIsVisible,
          })),
        []
      )
    ),
}
