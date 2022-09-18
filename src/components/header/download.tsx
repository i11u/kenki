import React from 'react'
import downloadSvg from '../../assets/icons/download.svg'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { colorThemeActions } from '../../jotai-hooks/colorTheme/action'

const Download = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const toggleColorTheme = colorThemeActions.useToggleColorTheme()

  return (
    <svg
      style={{ color: colorTheme.header, width: '10%', height: '60%', transform: 'translateY(30%)' }}
      onClick={() => toggleColorTheme()}
    >
      <use xlinkHref={`${downloadSvg}#download`} />
    </svg>
  )
}

export default Download
