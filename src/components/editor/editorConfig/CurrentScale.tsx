import React from 'react'
import styled from 'styled-components'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'

const Scale = () => {
  const scale = pageConfigSelectors.usePageScale()
  return <StyledText style={{ position: 'relative' }}>{Math.floor(scale * 100)}%</StyledText>
}

const StyledText = styled.div`
  color: #ffffff;
  transform: translateY(25%);
  font-weight: bold;
  font-family: 'Monaco', sans-serif;
  font-size: 90%;
`

export default React.memo(Scale)
