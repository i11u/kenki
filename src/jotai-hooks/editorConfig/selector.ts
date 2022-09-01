import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { selectAtom } from 'jotai/utils'
import { EditorConfig, editorConfigAtom, SidebarConfig } from './atom'

type EditorConfigSelectors = {
  useEditorConfig: () => EditorConfig
  useSidebarConfig: () => SidebarConfig
  useSidebarIsOpen: () => boolean | undefined
}

const useEditorConfigSelector = () =>
  useAtomValue<EditorConfig>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config, [])
    )
  )

const useSidebarConfigSelector = () =>
  useAtomValue<SidebarConfig>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config.sidebarConfig, [])
    )
  )

const useSidebarIsOpenSelector = () =>
  useAtomValue<boolean | undefined>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config.sidebarConfig.isOpen, [])
    )
  )

export const editorConfigSelectors: EditorConfigSelectors = {
  useEditorConfig: useEditorConfigSelector,
  useSidebarConfig: useSidebarConfigSelector,
  useSidebarIsOpen: useSidebarIsOpenSelector,
}
