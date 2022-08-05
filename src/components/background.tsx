import styled from 'styled-components'
import React, { ReactNode, useEffect } from 'react'
import { editorConfigSelectors } from '../states/editor'

type Props = { children: ReactNode }

const Background = React.memo(({ children }: Props) => {
  const sidebarDisplay = editorConfigSelectors.useSidebarDisplay()

  useEffect(() => {
    document.getElementById('background')!.addEventListener(
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
    <StyledBackground
      id="background"
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
      {children}
    </StyledBackground>
  )
})

const StyledBackground = styled.div`
  @keyframes animate-background-1 {
    from {
      left: 0;
      width: 100%;
    }
    to {
      left: 20%;
      width: 80%;
    }
  }

  @keyframes animate-background-2 {
    from {
      left: 20%;
      width: 80%;
    }
    to {
      left: 0;
      width: 100%;
    }
  }

  background-color: white;
  position: absolute;
  top: 5%;
  height: 95%;
  overflow: scroll;
`

export default Background
