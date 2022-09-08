import { useEffect, useRef, useState } from 'react'
import styled, { Keyframes } from 'styled-components'
import { useAtom } from 'jotai'
import { PageUtils } from '../../../utils/page'
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
import { modeSelectors } from '../../../jotai-hooks/mode/selector'
import CursorTSX from './cursor'

const Page = () => {
  const mode = modeSelectors.useCurrentMode()
  const [pageConfig, setPageConfig] = useAtom(pageConfigAtom)
  const [previousPageConfig, setPreviousPageConfig] = useState<PageConfig>({ ...pageConfig })
  const id = blockSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()
  const gridNum = pageConfigSelectors.useGridNum()
  const pageRef = useRef<HTMLDivElement>(null)
  const sidebarIsOpen = editorConfigSelectors.useSidebarIsOpen()
  useOnResizeEffect(gridNum.rowNum, pageRef)

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
      style={style}
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
      <CursorTSX />
    </StyledPage>
  )
}

const StyledPage = styled.div<{ keyframes: Keyframes }>`
  animation: ${(props) => props.keyframes};
  min-width: 960px;
  background-color: #25292e;
  box-shadow: 5px 5px 10px darkgrey, -1px 0 10px darkgrey;
  position: absolute;
  width: 100%;
`

export default Page
