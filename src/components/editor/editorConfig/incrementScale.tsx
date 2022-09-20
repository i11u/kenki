import React from 'react'
import enlargeSvg from '../../../assets/icons/editorConfig/enlarge.svg'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'

const Scale = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const currentScale = pageConfigSelectors.usePageScale()
  const changeScale = pageConfigActions.useChangeScale()

  return (
    <svg
      style={{
        color: colorTheme.icon,
        height: '50%',
        transform: 'translateY(50%)',
        pointerEvents: 'all',
      }}
      onClick={() => {
        if (currentScale + 0.1 > 2) {
          changeScale(2)
        } else {
          changeScale(currentScale + 0.1)
        }
      }}
    >
      <use xlinkHref={`${enlargeSvg}#enlarge`} />
    </svg>
  )
}

export default React.memo(Scale)
