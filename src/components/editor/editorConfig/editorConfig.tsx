import React from 'react'
import styled from 'styled-components'
import DecrementScale from './decrementScale'
import CurrentScale from './currentScale'
import IncrementScale from './incrementScale'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import More from './more'

const StyledWrapper = styled.div`
  position: absolute;
  border-radius: 5%;
  width: 200px;
  height: 34px;
  right: 3%;
  bottom: 5%;
  padding: 0 1%;
  z-index: 1;
`

const StyledFlex = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  gap: 0 16px;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-10%);
`

const EditorConfig = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  return (
    <StyledWrapper
      style={{
        backgroundColor: colorTheme.editorConfig,
        boxShadow: `3px 3px 5px ${colorTheme.shadow}, -1px 0 5px ${colorTheme.shadow}`,
      }}
    >
      <StyledFlex>
        <DecrementScale />
        <CurrentScale />
        <IncrementScale />
        {/* <AspectRatio /> */}
        <More />
      </StyledFlex>
    </StyledWrapper>
  )
}

export default React.memo(EditorConfig)
