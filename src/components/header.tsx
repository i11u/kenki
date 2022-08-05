import styled from 'styled-components'
import React, { useEffect } from 'react'
import { editorConfigActions, editorConfigSelectors } from '../states/editor'
import menuSvg from '../assets/icon/menu.svg'
import aspectRatioSvg from '../assets/icon/aspect-ratio.svg'
import { pageConfigActions, pageConfigSelectors } from '../states/page'

const HeaderJSX = React.memo(() => {
  const sidebarDisplay = editorConfigSelectors.useSidebarDisplay()
  const toggleSidebar = editorConfigActions.useToggleSidebar()
  const changeAspectRatio = pageConfigActions.useChangeAspectRatio()
  const aspectRatio = pageConfigSelectors.useAspectRatioSelector()

  useEffect(() => {
    document.getElementById('header')!.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
        }
      },
      { passive: false }
    )
  }, [])

  return (
    <StyledHeader
      id="header"
      style={{
        // eslint-disable-next-line no-nested-ternary
        width: sidebarDisplay === 'initial' ? '100%' : sidebarDisplay === 'open' ? '80%' : '100%',
        animation:
          // eslint-disable-next-line no-nested-ternary
          sidebarDisplay === 'initial'
            ? 'none'
            : sidebarDisplay === 'open'
            ? 'animate-background-1 0.5s forwards'
            : 'animate-background-2 0.5s forwards',
      }}
    >
      <StyledIcon
        src={menuSvg}
        alt="Menu icon"
        onClick={() => {
          toggleSidebar()
        }}
      />
      <StyledIcon
        src={aspectRatioSvg}
        alt="Resize icon"
        style={{ left: '95%', height: '70%', marginTop: '-8px' }}
        onClick={() => {
          changeAspectRatio(aspectRatio === 'vertical' ? 'slide' : 'vertical')
        }}
      />
    </StyledHeader>
  )
})

const StyledIcon = styled.img`
  position: absolute;
  left: 20px;
  aspect-ratio: 6/5;
  height: 50%;
  transform: translateY(50%);
`

const StyledHeader = styled.div`
  position: fixed;
  height: 5%;
  background-color: white;
  box-shadow: 1px 0 10px darkgrey;
  overflow: hidden;
  z-index: 1;
`

export default HeaderJSX
