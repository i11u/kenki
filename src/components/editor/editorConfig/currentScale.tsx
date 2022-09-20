import React from 'react'
import styled from 'styled-components'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

const Scale = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const scale = pageConfigSelectors.usePageScale()
  return (
    <StyledText style={{ position: 'relative', color: colorTheme.textPrimary }}>{Math.floor(scale * 100)}%</StyledText>
  )
}

const StyledText = styled.div`
  transform: translateY(38%);
  font-family: 'Monaco', sans-serif;
  font-size: 90%;
`

export default React.memo(Scale)
