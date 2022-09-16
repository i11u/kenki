import React from 'react'
import styled from 'styled-components'
import DecrementScale from './DecrementScale'
import CurrentScale from './CurrentScale'
import IncrementScale from './IncrementScale'
import More from './More'

const StyledWrapper = styled.div`
  position: fixed;
  background-color: #363c44;
  border-radius: 5%;
  height: 4%;
  right: 3%;
  bottom: 5%;
  box-shadow: 3px 3px 5px #25292e, -1px 0 5px #25292e;
  padding: 0 1%;
`

const StyledFlex = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  gap: 0 20px;
  align-items: center;
  transform: translateY(-8%);
`

const EditorConfig = () => (
  <StyledWrapper>
    <StyledFlex>
      <DecrementScale />
      <CurrentScale />
      <IncrementScale />
      <More />
    </StyledFlex>
  </StyledWrapper>
)

export default React.memo(EditorConfig)
