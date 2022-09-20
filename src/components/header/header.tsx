import styled from 'styled-components'
import React, { useRef } from 'react'
import usePreventPinch from '../../hooks/usePreventPinch'
import Download from './download'
import Trash from './trash'
import Settings from './settings'
import Help from './help'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import PageTitle from './pageTitle'

const Header = React.memo(() => {
  const headerRef = useRef<HTMLDivElement>(null)
  const colorTheme = colorThemeSelector.useColorTheme()
  const style = {
    // backgroundColor: colorTheme.header,
    backgroundColor: 'transparent',
    borderBottom: `0.5px solid ${colorTheme.border}`,
    // borderBottom: `0px solid ${colorTheme.border}`,
  }
  usePreventPinch(headerRef)

  return (
    <StyledHeader id="header" ref={headerRef} style={style}>
      <StyledFlexLeft>
        <Download />
        <Trash />
      </StyledFlexLeft>
      <PageTitle />
      <StyledFlexRight>
        {/* <Share /> */}
        {/* <Feedback /> */}
        <Settings />
        <Help />
      </StyledFlexRight>
    </StyledHeader>
  )
})

const StyledHeader = styled.div`
  width: 100%;
  position: fixed;
  height: 34px;
  overflow: hidden;
  z-index: 3;
`

const StyledFlexLeft = styled.div`
  position: absolute;
  width: 100px;
  height: 100%;
  display: flex;
  gap: 0 20px;
  left: 1%;
  justify-content: space-between;
`

const StyledFlexRight = styled.div`
  position: absolute;
  width: 100px;
  height: 100%;
  display: flex;
  gap: 0 20px;
  right: 1%;
  justify-content: space-between;
`

export default Header
