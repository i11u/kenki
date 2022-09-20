import React from 'react'
import moreSvg from '../../../assets/icons/editorConfig/more.svg'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'

const More = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const aspectRatio = pageConfigSelectors.useAspectRatio()
  const changeAspectRatio = pageConfigActions.useChangeAspectRatio()

  return (
    <svg
      style={{ color: colorTheme.icon, height: '50%', transform: 'translateY(50%)', pointerEvents: 'all' }}
      onClick={() => changeAspectRatio(aspectRatio === 'document' ? 'slide' : 'document')}
    >
      <use xlinkHref={`${moreSvg}#more`} />
    </svg>
  )
}

export default React.memo(More)
