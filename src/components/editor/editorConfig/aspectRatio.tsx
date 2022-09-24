import React from 'react'
import aspectRatioSvg from '../../../assets/icons/editorConfig/aspect-ratio.svg'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'

const AspectRatio = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const aspectRatio = pageConfigSelectors.useAspectRatio()
  const changeAspectRatio = pageConfigActions.useChangeAspectRatio()

  return (
    <svg
      style={{
        color: colorTheme.icon,
        height: '70%',
        transform: 'translateY(22%)',
        pointerEvents: 'all',
      }}
      onClick={() => changeAspectRatio(aspectRatio === 'document' ? 'slide' : 'document')}
    >
      <use xlinkHref={`${aspectRatioSvg}#aspect-ratio`} />
    </svg>
  )
}

export default React.memo(AspectRatio)
