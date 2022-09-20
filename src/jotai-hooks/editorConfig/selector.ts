import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { selectAtom } from 'jotai/utils'
import { EditorConfig, editorConfigAtom, SidebarConfig } from './atom'

type EditorConfigSelectors = {
  useEditorConfig: () => EditorConfig
  useSidebarLeftConfig: () => SidebarConfig
  useSidebarRightConfig: () => SidebarConfig
  useSidebarLeftIsOpen: () => boolean | undefined
  useSidebarRightIsOpen: () => boolean | undefined
}

const useEditorConfigSelector = () =>
  useAtomValue<EditorConfig>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config, [])
    )
  )

const useSidebarLeftConfigSelector = () =>
  useAtomValue<SidebarConfig>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config.sidebarLeftConfig, [])
    )
  )

const useSidebarRightConfigSelector = () =>
  useAtomValue<SidebarConfig>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config.sidebarRightConfig, [])
    )
  )

const useSidebarLeftIsOpenSelector = () =>
  useAtomValue<boolean | undefined>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config.sidebarLeftConfig.isOpen, [])
    )
  )

const useSidebarRightIsOpenSelector = () =>
  useAtomValue<boolean | undefined>(
    selectAtom(
      editorConfigAtom,
      useCallback((config) => config.sidebarRightConfig.isOpen, [])
    )
  )

export const editorConfigSelectors: EditorConfigSelectors = {
  useEditorConfig: useEditorConfigSelector,
  useSidebarLeftConfig: useSidebarLeftConfigSelector,
  useSidebarRightConfig: useSidebarRightConfigSelector,
  useSidebarLeftIsOpen: useSidebarLeftIsOpenSelector,
  useSidebarRightIsOpen: useSidebarRightIsOpenSelector,
}
