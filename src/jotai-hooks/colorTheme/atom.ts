import { atom } from 'jotai'

export type ColorTheme = {
  icon: string
  header: string
  grid: string
  page: string
  background: string
  footer: string
}

export const normalColorTheme = {
  icon: '#000000',
  header: '#000000',
  grid: '#ffffff',
  page: '#ffffff',
  background: '#ffffff',
  footer: '#ffffff',
}

export const darkColorTheme = {
  icon: '#ffffff',
  header: '#ffffff',
  grid: '#ffffff',
  page: '#ffffff',
  background: '#ffffff',
  footer: '#ffffff',
}

export const colorThemeAtom = atom<ColorTheme>(darkColorTheme)
