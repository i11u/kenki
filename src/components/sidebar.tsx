import styled from 'styled-components'
import React, { useEffect } from 'react'
import { editorConfigSelectors } from '../states/editor'
import { pageConfigSelectors } from '../states/page'

const SidebarJSX = React.memo(() => {
  const sidebarDisplay = editorConfigSelectors.useSidebarDisplay()
  const gridNum = pageConfigSelectors.useGridNumSelector()

  useEffect(() => {
    document.getElementById('sidebar')!.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
        }
      },
      { passive: false }
    )
  }, [])

  useEffect(() => {
    const handleOnResize = () => {
      const pageDOM = document.getElementById('page') as HTMLDivElement
      pageDOM.style.fontSize = `${pageDOM.clientHeight / gridNum.rowNum - 5}px`
      pageDOM.style.lineHeight = `${pageDOM.clientHeight / gridNum.rowNum}px`
    }
    const resizeObserver = new ResizeObserver(() => handleOnResize())
    resizeObserver.observe(document.getElementById('sidebar') as HTMLElement)
  }, [gridNum.rowNum])

  return (
    <StyledSidebar
      id="sidebar"
      style={{
        // eslint-disable-next-line no-nested-ternary
        width: sidebarDisplay === 'initial' ? '0' : sidebarDisplay === 'open' ? '0' : '0',
        animation:
          // eslint-disable-next-line no-nested-ternary
          sidebarDisplay === 'initial'
            ? 'none'
            : sidebarDisplay === 'open'
            ? 'animate-sidebar-1 0.5s forwards'
            : 'animate-sidebar-2 0.5s forwards',
      }}
    />
  )
})

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

  height: 100%;
  background-color: #f9f9f9;
  position: fixed;
  border-right: 0.5px solid lightgray;
  box-sizing: border-box;
  z-index: 2;
`

export default SidebarJSX
