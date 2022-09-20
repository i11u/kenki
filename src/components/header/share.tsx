import React from 'react'
import shareSvg from '../../assets/icons/header/share.svg'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { colorThemeActions } from '../../jotai-hooks/colorTheme/action'

const Share = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const toggleColorTheme = colorThemeActions.useToggleColorTheme()

  return (
    <svg
      style={{ color: colorTheme.icon, height: '50%', transform: 'translateY(50%)' }}
      onClick={() => toggleColorTheme()}
    >
      <use xlinkHref={`${shareSvg}#share`} />
    </svg>
  )
}

export default Share
