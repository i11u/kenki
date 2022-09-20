import React from 'react'
import guideSvg from '../../assets/icons/header/help.svg'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { modeActions } from '../../jotai-hooks/mode/action'
import { editorConfigActions } from '../../jotai-hooks/editorConfig/action'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'

const Help = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const mode = modeSelectors.useCurrentMode()
  const changeMode = modeActions.useSwitchModes()
  const sidebarRightIsOpen = editorConfigSelectors.useSidebarRightIsOpen()
  const toggleSidebarRight = editorConfigActions.useToggleSidebarRight()

  return (
    <svg
      style={{ color: colorTheme.icon, height: '50%', transform: 'translateY(50%)' }}
      onClick={() => {
        if (mode === 'HELP') {
          changeMode('CURSOR')
          toggleSidebarRight()
        } else {
          changeMode('HELP')
          if (sidebarRightIsOpen) toggleSidebarRight()
        }
      }}
    >
      <use xlinkHref={`${guideSvg}#help`} />
    </svg>
  )
}

export default Help
