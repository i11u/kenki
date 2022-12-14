import { atom } from 'jotai'

export type FontFamily =
  | 'SF Mono'
  | 'SFMono-Regular'
  | 'ui-monospace'
  | 'Menlo'
  | 'Monaco'
  | 'Cascadia Mono'
  | 'Segoe UI Mono'
  | 'Roboto Mono'
  | 'monospace'
  | '凸版文久ゴシック'

export type HeaderConfig = { display: 'open' | 'closed' }

export type SidebarConfig = { isOpen: boolean | undefined }

export type Style = 'Plain' | 'Bold' | 'Italic' | 'Underline' | 'StrikeThrough'

export type EditorConfig = {
  fontFamily: string
  headerConfig: HeaderConfig
  sidebarLeftConfig: SidebarConfig
  sidebarRightConfig: SidebarConfig
  separationIsVisible: boolean
}

/*
 * Ideally, atoms must not be accessible from components but only from custom hooks, such as actions or selectors.
 * TypeScript currently does not have a feature to export "locally", which may be enabled by:
 * https://github.com/microsoft/TypeScript/issues/41316
 * */
export const editorConfigAtom = atom<EditorConfig>({
  fontFamily: '凸版文久ゴシック',
  headerConfig: { display: 'open' },
  sidebarLeftConfig: { isOpen: undefined },
  sidebarRightConfig: { isOpen: undefined },
  separationIsVisible: false,
})
