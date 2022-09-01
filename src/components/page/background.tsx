import styled from 'styled-components'
import React, { ReactNode, useRef } from 'react'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import { aspectRatioValue } from '../../jotai-hooks/pageConfig/atom'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import usePreventPinch from '../../hooks/usePreventPinch'
import { PageUtils } from '../../utils/page'
import useIsFirst from '../../hooks/useIsFirst'

type Props = { children: ReactNode }

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

  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  background-color: white;
  position: absolute;
  top: 5%;
  height: 93%;
  overflow: auto;
  display: flex;
`

const Background = React.memo(({ children }: Props) => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  usePreventPinch(backgroundRef)

  const sidebarIsOpen = editorConfigSelectors.useSidebarIsOpen()
  const pageConfig = pageConfigSelectors.usePageConfig()
  const aspectRatio = aspectRatioValue(pageConfig.aspectRatio)

  const style = useIsFirst()
    ? { width: '100%' }
    : {
        width: sidebarIsOpen ? '80%' : '100%',
        animationName:
          sidebarIsOpen === undefined ? '' : sidebarIsOpen ? 'animate-background-1' : 'animate-background-2',
        alignItems:
          pageConfig.scale * PageUtils.getAspectRatio(aspectRatio) * window.screen.width < window.screen.height
            ? 'center'
            : pageConfig.scale < 1
            ? 'top'
            : '',
      }

  return (
    <StyledBackground ref={backgroundRef} style={style}>
      {children}
    </StyledBackground>
  )
})

export default Background
