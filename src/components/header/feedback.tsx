import React from 'react'
import feedbackSvg from '../../assets/icons/header/feedback.svg'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { colorThemeActions } from '../../jotai-hooks/colorTheme/action'

const Feedback = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const toggleColorTheme = colorThemeActions.useToggleColorTheme()

  return (
    <svg
      style={{ color: colorTheme.icon, height: '50%', transform: 'translateY(50%)' }}
      onClick={() => toggleColorTheme()}
    >
      <use xlinkHref={`${feedbackSvg}#feedback`} />
    </svg>
  )
}

export default Feedback
