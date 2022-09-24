import React from 'react'
import settingsSvg from '../../assets/icons/header/settings.svg'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { modeActions } from '../../jotai-hooks/mode/action'
import { editorConfigActions } from '../../jotai-hooks/editorConfig/action'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

const Settings = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const mode = modeSelectors.useCurrentMode()
  const changeMode = modeActions.useSwitchModes()
  const toggleSidebarRight = editorConfigActions.useToggleSidebarRight()

  return (
    <svg
      style={{ color: colorTheme.icon, height: '50%', transform: 'translateY(50%)' }}
      onClick={() => {
        if (mode === 'SETTINGS') {
          changeMode('NORMAL')
          toggleSidebarRight()
        } else if (mode === 'HELP') {
          changeMode('SETTINGS')
        } else {
          changeMode('SETTINGS')
          toggleSidebarRight()
        }
      }}
    >
      <use xlinkHref={`${settingsSvg}#settings`} />
    </svg>
  )
}

export default Settings
