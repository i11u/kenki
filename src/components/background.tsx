import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import React, { ReactNode, useEffect } from 'react'
import { editorConfigSelectors } from '../states/editor'
import { aspectRatioValue, pageConfigActions, pageConfigSelectors } from '../states/page'
import { PageUtil } from '../utils/page'

type Props = { children: ReactNode }

const Background = React.memo(({ children }: Props) => {
  const sidebarDisplay = editorConfigSelectors.useSidebarDisplay()
  const changeScale = pageConfigActions.useChangeScale()
  const pageConfig = pageConfigSelectors.usePageConfigSelector()

  const zoomed = css`
    align-items: ${
      // eslint-disable-next-line no-nested-ternary,no-restricted-globals
      pageConfig.scale * PageUtil.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio)) * screen.width <
      // eslint-disable-next-line no-restricted-globals
      screen.height
        ? 'center'
        : pageConfig.scale < 1
        ? 'top'
        : ''
    };
  `

  useEffect(() => {
    ;(document.getElementById('background') as HTMLDivElement).addEventListener(
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
      zoomed={zoomed}
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

const StyledBackground = styled.div<{ zoomed: FlattenSimpleInterpolation }>`
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

  ${(props) => props.zoomed}

  background-color: white;
  position: absolute;
  top: 5%;
  height: 95%;
  overflow: auto;
  display: flex;
  //align-content: center;
  //flex-flow: column wrap;
  //white-space: nowrap;
  //flex-wrap: nowrap;
  //justify-content: center;
  //min-height: max-content;
`

export default Background
