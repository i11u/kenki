import { atom } from 'jotai'

export type ColorTheme = {
  name: string
  icon: string
  header: string
  grid: string
  page: string
  background: string
  footer: string
  editorConfig: string
  textPrimary: string
  textSecondary: string
  border: string
  shadow: string
  sidebar: string
  searchBox: string
  itemSelected: string
  commands: string
  commandOdd: string
  commandEven: string
  blockBorder: string
}

export const light: ColorTheme = {
  name: 'light',

  icon: '#000000',
  // icon: 'rgba(130, 135, 120)',

  // header: '#ffffff',
  // header: 'rgba(250, 250, 220)',
  header: 'rgba(243, 242, 238)',

  grid: '#dcdcdc',

  // page: '#ffffff',
  // page: 'rgba(250, 250, 220)',
  page: 'rgba(243, 242, 238)',

  // background: '#ffffff',
  //   background: 'rgba(250, 250, 220)',
  background: 'rgba(243, 242, 238)',

  // footer: '#ffffff',
  // footer: 'rgba(250, 250, 220)',
  footer: 'rgba(243, 242, 238)',

  // editorConfig: '#ffffff',
  editorConfig: 'rgba(243, 242, 238)',

  textPrimary: '#000000',
  textSecondary: 'rgba(115, 120, 105)',

  // border: '#dcdcdc',
  // border: 'rgba(130, 135, 120)',
  border: '#000000',

  shadow: '#dcdcdc',

  // sidebarLeft: '#ffffff',
  sidebar: 'rgba(243, 242, 238)',

  searchBox: '#dcdcdc',
  itemSelected: '#dcdcdc',

  // commands: '#ffffff',
  commands: 'rgb(237,234,229)',

  // commandOdd: '#ffffff'
  commandOdd: 'rgba(237, 234, 229)',

  // commandEven: '#ffffff',
  commandEven: 'rgba(243, 242, 238)',

  blockBorder: '#8d8d8d',
}

export const dark: ColorTheme = {
  name: 'dark',

  icon: '#ffffff',
  // header: '#25292e',
  header: 'rgba(55, 59, 64)',
  grid: '#2F4F4FFF',
  // page: '#25292e',
  page: 'rgba(55, 59, 64)',
  // background: '#25292e',
  background: 'rgba(55, 59, 64)',
  editorConfig: '#363c44',
  // footer: '#25292e',
  footer: 'rgba(55, 59, 64)',
  textPrimary: '#ffffff',
  textSecondary: 'rgb(183,187,175)',
  // border: '#363c44',
  border: 'rgb(35,35,36)',
  shadow: '#3d444d',
  // sidebarLeft: '#25292e',
  sidebar: 'rgba(55, 59, 64)',
  // searchBox: '#363c44',
  searchBox: 'rgba(48, 48, 51)',
  // itemSelected: '#363c44',
  itemSelected: 'rgba(48, 48, 51)',
  commands: '#25292e',
  commandOdd: '#25292e',
  commandEven: '#2a2e34',

  blockBorder: 'gray',
}

export const colorThemeAtom = atom<ColorTheme>(light)
