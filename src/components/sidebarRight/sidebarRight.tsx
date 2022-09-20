import styled from 'styled-components'
import React, { useRef } from 'react'
import usePreventPinch from '../../hooks/usePreventPinch'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import useOnResizeEffect from '../../hooks/useOnResizeEffect'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import useIsFirst from '../../hooks/useIsFirst'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import { editorConfigActions } from '../../jotai-hooks/editorConfig/action'

const SidebarRight = () => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  usePreventPinch(sidebarRef)
  const gridNum = pageConfigSelectors.useGridNum()
  useOnResizeEffect(gridNum.rowNum, sidebarRef)
  const toggleSidebarRight = editorConfigActions.useToggleSidebarRight()
  const mode = modeSelectors.useCurrentMode()
  const colorTheme = colorThemeSelector.useColorTheme()
  const gridIsVisible = pageConfigSelectors.useGridIsVisible()
  const blockBorderIsVisible = pageConfigSelectors.useBlockBorderIsVisible()

  // SidebarRight Animation
  const sidebarRightIsOpen = editorConfigSelectors.useSidebarRightIsOpen()
  const style = useIsFirst()
    ? { width: '0' }
    : {
        animationName:
          sidebarRightIsOpen === undefined ? '' : sidebarRightIsOpen ? 'animate-sidebar-1' : 'animate-sidebar-2',
      }

  return (
    <StyledSidebar
      id="sidebar-right"
      ref={sidebarRef}
      style={{
        ...style,
        backgroundColor: colorTheme.sidebar,
        borderLeft: sidebarRightIsOpen === true ? `0.5px solid ${colorTheme.border}` : '',
      }}
    >
      {mode === 'SETTINGS' ? (
        <StyledFlex>
          <StyledTitle style={{ color: colorTheme.textPrimary }}>Settings</StyledTitle>
          <StyledLabel style={{ color: colorTheme.textSecondary }}>Global</StyledLabel>
          <StyledItem style={{ color: colorTheme.textPrimary }}>Color theme (⌘+L): {colorTheme.name}</StyledItem>
          <StyledLabel style={{ color: colorTheme.textSecondary }}>Editor</StyledLabel>
          <StyledItem style={{ color: colorTheme.textPrimary }}>
            Grid (⌘+G): {gridIsVisible ? 'visible' : 'hidden'}
          </StyledItem>
          <StyledItem style={{ color: colorTheme.textPrimary }}>
            Block border (⌘+B): {blockBorderIsVisible ? 'visible' : 'hidden'}
          </StyledItem>
        </StyledFlex>
      ) : mode === 'HELP' ? (
        <StyledFlex>
          <StyledTitle style={{ color: colorTheme.textPrimary }}>Help</StyledTitle>
          <StyledLabel style={{ color: colorTheme.textSecondary }}>How to use</StyledLabel>
        </StyledFlex>
      ) : null}
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  top: 34px;
  right: 0;
  height: calc(100% - 50px);
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  position: fixed;
  box-sizing: border-box;
  z-index: 1;
`

const StyledFlex = styled.div`
  position: relative;
  margin-top: 40px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  height: fit-content;
`

const StyledTitle = styled.div`
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
`

const StyledLabel = styled.div`
  white-space: nowrap;
  font-size: 18px;
`

const StyledItem = styled.div`
  white-space: nowrap;
  font-size: 14px;
  margin-left: 12px;
`

export default React.memo(SidebarRight)
