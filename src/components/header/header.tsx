import styled from 'styled-components'
import React, { useRef } from 'react'
import usePreventPinch from '../../hooks/usePreventPinch'
import Menu from './menu'
import HeaderConfig from './headerConfig'

const Header = React.memo(() => {
  const headerRef = useRef<HTMLDivElement>(null)
  usePreventPinch(headerRef)

  return (
    <StyledHeader id="header" ref={headerRef}>
      <Menu />
      <HeaderConfig />
    </StyledHeader>
  )
})

const StyledHeader = styled.div`
  width: 100%;
  position: fixed;
  height: 5%;
  background-color: white;
  box-shadow: 1px 0 10px darkgrey;
  overflow: hidden;
  z-index: 1;
`

export default Header
