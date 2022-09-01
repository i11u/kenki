import styled from 'styled-components'
import React, { useRef } from 'react'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import usePreventPinch from '../../hooks/usePreventPinch'
import useIsFirst from '../../hooks/useIsFirst'
import useOnResizeEffect from '../../hooks/useOnResizeEffect'

const StyledSidebar = styled.div`
  @keyframes animate-sidebar-1 {
    from {
      width: 0;
    }
    to {
      width: 20%;
    }
  }

  @keyframes animate-sidebar-2 {
    from {
      width: 20%;
    }
    to {
      width: 0;
    }
  }

  top: 5%;
  height: 95%;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  background-color: #f9f9f9;
  position: fixed;
  border-right: 0.5px solid lightgray;
  box-sizing: border-box;
  z-index: 0;
`

const Sidebar = React.memo(() => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  usePreventPinch(sidebarRef)
  const gridNum = pageConfigSelectors.useGridNum()
  useOnResizeEffect(gridNum.rowNum, sidebarRef)

  const sidebarIsOpen = editorConfigSelectors.useSidebarIsOpen()

  const style = useIsFirst()
    ? { width: '0' }
    : { animationName: sidebarIsOpen === undefined ? '' : sidebarIsOpen ? 'animate-sidebar-1' : 'animate-sidebar-2' }

  return <StyledSidebar id="sidebar" ref={sidebarRef} style={style} />
})

export default Sidebar
