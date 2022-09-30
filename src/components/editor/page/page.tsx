import React, { useEffect, useRef, useState } from 'react'
import styled, { Keyframes } from 'styled-components'
import { useAtom } from 'jotai'
import { PageUtils } from '../../../apis/page'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { blocksActions } from '../../../jotai-hooks/blocks/action'
import { PageConfig, pageConfigAtom } from '../../../jotai-hooks/pageConfig/atom'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import useOnResizeEffect from '../../../hooks/useOnResizeEffect'
import useThrottleCallback from '../../../hooks/useThrottleCallback'
import Grid from './grid'
import { editorConfigSelectors } from '../../../jotai-hooks/editorConfig/selector'
import useOnWheelPageEffect from '../../../hooks/useOnWheelPageEffect'
import Blocks from './blocks'
import CursorTSX from './cursor'
import Relations from './relations'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

const Page = () => {
  const [pageConfig, setPageConfig] = useAtom(pageConfigAtom)
  const [previousPageConfig, setPreviousPageConfig] = useState<PageConfig>({ ...pageConfig })
  const id = blockSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()
  const gridNum = pageConfigSelectors.useGridNum()
  const pageRef = useRef<HTMLDivElement>(null)
  const sidebarIsOpen = editorConfigSelectors.useSidebarLeftIsOpen()
  useOnResizeEffect(gridNum.rowNum, pageRef)
  const colorTheme = colorThemeSelector.useColorTheme()

  const style = PageUtils.style(pageConfig.aspectRatio)

  const throttle = useThrottleCallback()

  useOnWheelPageEffect(pageRef, setPreviousPageConfig, setPageConfig, throttle)

  const [kf, setKf] = useState<Keyframes>(PageUtils.keyframes(pageRef, sidebarIsOpen, previousPageConfig, pageConfig))

  useEffect(() => {
    const handleOnResize = () => {
      setKf(PageUtils.keyframes(pageRef, sidebarIsOpen, previousPageConfig, pageConfig))
    }
    setKf(PageUtils.keyframes(pageRef, sidebarIsOpen, previousPageConfig, pageConfig))
    window.addEventListener('resize', handleOnResize)
  }, [pageConfig, previousPageConfig, sidebarIsOpen])

  return (
    <StyledPage
      id="page"
      ref={pageRef}
      style={{
        ...style,
        backgroundColor: colorTheme.page,
        // borderRight: `1px solid ${colorTheme.grid}`,
        // borderBottom: `1px solid ${colorTheme.grid}`,
        boxShadow: `5px 5px 10px ${colorTheme.shadow}, -1px 0 10px ${colorTheme.shadow}`,
      }}
      keyframes={kf}
      onMouseDown={(e) =>
        e.target === pageRef.current
          ? PageUtils.handleOnMouseDown({
              e,
              gridNum,
              id,
              changeBlockStatus,
              changeBlockPosition,
              addBlock,
            })
          : (e.target as HTMLDivElement).focus()
      }
    >
      <Grid />
      <Blocks />
      <Relations />
      <CursorTSX />
    </StyledPage>
  )
}

const StyledPage = styled.div<{ keyframes: Keyframes }>`
  animation: ${(props) => props.keyframes};
  min-width: 960px;
  position: absolute;
  width: 100%;
  z-index: 0;
`

export default React.memo(Page)
