import styled from 'styled-components'
import React, { useRef } from 'react'
import usePreventPinch from '../../hooks/usePreventPinch'
import Download from './download'
import Trash from './trash'
import Share from './share'
import Feedback from './feedback'
import Settings from './settings'
import Help from './help'

const Header = React.memo(() => {
  const headerRef = useRef<HTMLDivElement>(null)
  usePreventPinch(headerRef)

  return (
    <StyledHeader id="header" ref={headerRef}>
      <StyledFlexLeft>
        <Download />
        <Trash />
      </StyledFlexLeft>
      <StyledFlexRight>
        <Share />
        <Feedback />
        <Settings />
        <Help />
      </StyledFlexRight>
    </StyledHeader>
  )
})

const StyledHeader = styled.div`
  width: 100%;
  position: fixed;
  height: 5%;
  background-color: #25292e;
  //box-shadow: 1px 0 10px darkgrey;
  overflow: hidden;
  z-index: 1;
  border-bottom: 1px solid #a9a9a9;
`

const StyledFlexLeft = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  gap: 0 20px;
  left: 1%;
`

const StyledFlexRight = styled.div`
  position: absolute;
  height: 90%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 0 20px;
  right: 1%;
`

export default Header
