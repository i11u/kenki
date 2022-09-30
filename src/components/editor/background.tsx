import styled from 'styled-components'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import { aspectRatioValue } from '../../jotai-hooks/pageConfig/atom'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import usePreventPinch from '../../hooks/usePreventPinch'
import { PageUtils } from '../../apis/page'
import useIsFirst from '../../hooks/useIsFirst'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

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

  @keyframes animate-background-3 {
    from {
      right: 0;
      width: 100%;
    }
    to {
      right: 20%;
      width: 80%;
    }
  }

  @keyframes animate-background-4 {
    from {
      right: 20%;
      width: 80%;
    }
    to {
      right: 0;
      width: 100%;
    }
  }

  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  position: absolute;
  top: 34px;
  height: calc(100% - 50px);
  //height: calc(100% - 16px);
  overflow: auto;
  display: flex;
  z-index: 1;
`

const Background = React.memo(({ children }: Props) => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  usePreventPinch(backgroundRef)

  const sidebarLeftIsOpen = editorConfigSelectors.useSidebarLeftIsOpen()
  const sidebarRightIsOpen = editorConfigSelectors.useSidebarRightIsOpen()
  const pageConfig = pageConfigSelectors.usePageConfig()
  const aspectRatio = aspectRatioValue(pageConfig.aspectRatio)
  const colorTheme = colorThemeSelector.useColorTheme()
  const [lastToggledSidebar, setLastToggledSidebar] = useState<'left' | 'right'>()

  useEffect(() => {
    if (sidebarLeftIsOpen) setLastToggledSidebar('left')
    if (sidebarRightIsOpen) setLastToggledSidebar('right')
  }, [sidebarLeftIsOpen, sidebarRightIsOpen])

  const style = useIsFirst()
    ? {
        width: '100%',
        backgroundColor: colorTheme.background,
      }
    : {
        width: sidebarLeftIsOpen ? '80%' : '100%',
        backgroundColor: colorTheme.background,
        animationName:
          sidebarLeftIsOpen === undefined && sidebarRightIsOpen === undefined
            ? ''
            : sidebarLeftIsOpen && sidebarRightIsOpen
            ? ''
            : sidebarLeftIsOpen && !sidebarRightIsOpen
            ? 'animate-background-1'
            : sidebarRightIsOpen && !sidebarLeftIsOpen
            ? 'animate-background-3'
            : lastToggledSidebar === 'left'
            ? 'animate-background-2'
            : 'animate-background-4',
        alignItems:
          pageConfig.scale * PageUtils.getAspectRatio(aspectRatio) * window.screen.width < window.screen.height
            ? 'center'
            : pageConfig.scale < 1
            ? 'top'
            : '',
      }

  return (
    <StyledBackground id="background" ref={backgroundRef} style={style}>
      {children}
    </StyledBackground>
  )
})

export default Background
