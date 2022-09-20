import React from 'react'
import reduceSvg from '../../../assets/icons/editorConfig/reduce.svg'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'

const DecrementScale = () => {
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
        if (currentScale - 0.1 < 0.5) {
          changeScale(0.5)
        } else {
          changeScale(currentScale - 0.1)
        }
      }}
    >
      <use xlinkHref={`${reduceSvg}#reduce`} />
    </svg>
  )
}

export default React.memo(DecrementScale)
