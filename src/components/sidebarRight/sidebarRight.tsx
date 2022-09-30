import React, { useRef } from 'react'
import styled from 'styled-components'
import usePreventPinch from '../../hooks/usePreventPinch'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import useOnResizeEffect from '../../hooks/useOnResizeEffect'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import useIsFirst from '../../hooks/useIsFirst'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

const SidebarRight = () => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  usePreventPinch(sidebarRef)
  const gridNum = pageConfigSelectors.useGridNum()
  useOnResizeEffect(gridNum.rowNum, sidebarRef)
  const mode = modeSelectors.useCurrentMode()
  const colorTheme = colorThemeSelector.useColorTheme()
  const gridIsVisible = pageConfigSelectors.useGridIsVisible()
  const blockBorderIsVisible = pageConfigSelectors.useBlockBorderIsVisible()
  const separationIsVisible = editorConfigSelectors.useSeparationIsVisible()

  // SidebarRight Animation
  const sidebarRightIsOpen = editorConfigSelectors.useSidebarRightIsOpen()
  const style = useIsFirst()
    ? { width: '0' }
    : {
        animationName:
          sidebarRightIsOpen === undefined ? '' : sidebarRightIsOpen ? 'animate-sidebar-1' : 'animate-sidebar-2',
      }

  return (
    <>
      <StyledSidebar
        id="sidebar-right"
        ref={sidebarRef}
        style={{
          ...style,
          backgroundColor: colorTheme.sidebar,
          borderLeft:
            sidebarRightIsOpen === true ? `0.5px solid ${separationIsVisible ? colorTheme.border : 'transparent'}` : '',
        }}
      />
      {mode === 'SETTINGS' ? (
        <StyledFlex style={{ width: `${window.innerWidth * 0.2}px` }}>
          <StyledFlex2>
            <StyledTitle style={{ color: colorTheme.textPrimary }}>Settings</StyledTitle>
            <StyledLabel style={{ color: colorTheme.textSecondary }}>Global</StyledLabel>
            <StyledItem style={{ color: colorTheme.textPrimary }}>Color theme (⌘+L): {colorTheme.name}</StyledItem>
            <StyledItem style={{ color: colorTheme.textPrimary }}>
              Separation (⌘+S): {separationIsVisible ? 'on' : 'off'}
            </StyledItem>
            <StyledLabel style={{ color: colorTheme.textSecondary }}>Editor</StyledLabel>
            <StyledItem style={{ color: colorTheme.textPrimary }}>
              Grid (⌘+G): {gridIsVisible ? 'visible' : 'hidden'}
            </StyledItem>
            <StyledItem style={{ color: colorTheme.textPrimary }}>
              Block border (⌘+V): {blockBorderIsVisible ? 'visible' : 'hidden'}
            </StyledItem>
          </StyledFlex2>
        </StyledFlex>
      ) : mode === 'HELP' ? (
        <StyledFlex style={{ width: `calc(${window.innerWidth * 0.2}px - 0.5px)` }}>
          <StyledFlex2>
            <StyledTitle style={{ color: colorTheme.textPrimary }}>Help</StyledTitle>
            <StyledLabel style={{ color: colorTheme.textSecondary }}>Modes</StyledLabel>
            <StyledItem style={{ color: colorTheme.textPrimary }}>
              kenki is built upon vim-like mode transitions.
            </StyledItem>
            <StyledItem style={{ color: colorTheme.textPrimary }}>
              Please visit our <a href="https://scrapbox.io/kenki/%E9%8D%B5%E8%A8%98_(kenki)">wiki</a> for more
              information.
            </StyledItem>

            <StyledLabel style={{ color: colorTheme.textSecondary }}>Cursor mode</StyledLabel>
            <StyledItem style={{ color: colorTheme.textPrimary }}>Move cursor: vim</StyledItem>
          </StyledFlex2>
        </StyledFlex>
      ) : null}
    </>
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
  z-index: 0;
`

const StyledFlex = styled.div`
  position: fixed;
  top: 34px;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  z-index: 1;
`

const StyledFlex2 = styled.div`
  position: relative;
  margin-top: 40px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  height: fit-content;
`

const StyledTitle = styled.div`
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
`

const StyledLabel = styled.div`
  width: 100%;
  font-size: 18px;
`

const StyledItem = styled.div`
  width: 80%;
  font-size: 14px;
  margin-left: 12px;
`

export default React.memo(SidebarRight)
