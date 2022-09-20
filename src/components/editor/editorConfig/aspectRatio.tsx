import React from 'react'
import styled from 'styled-components'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'

const AspectRatio = () => {
  const aspectRatio = pageConfigSelectors.useAspectRatio()
  const changeAspectRatio = pageConfigActions.useChangeAspectRatio()

  return <StyledWrapper>aaa</StyledWrapper>
}

const StyledWrapper = styled.div`
  box-shadow: darkslategray;
`

export default React.memo(AspectRatio)