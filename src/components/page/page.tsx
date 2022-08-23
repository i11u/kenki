import { useEffect, useRef, useState } from 'react'
import styled, { Keyframes } from 'styled-components'
import { useRecoilState } from 'recoil'
import { PageUtils } from '../../utils/page'
import { blockSelectors } from '../../recoil-hooks/blocks/selector'
import { blocksActions } from '../../recoil-hooks/blocks/action'
import { PageConfig, pageConfigAtom } from '../../recoil-hooks/pageConfig/atom'
import { pageConfigSelectors } from '../../recoil-hooks/pageConfig/selector'
import useOnResizeEffect from '../../hooks/useOnResizeEffect'
import useThrottleCallback from '../../hooks/useThrottleCallback'
import Grid from './grid'
import { editorConfigSelectors } from '../../recoil-hooks/editorConfig/selector'
import useOnWheelPageEffect from '../../hooks/useOnWheelPageEffect'
import Blocks from './blocks'

const Page = () => {
  const [pageConfig, setPageConfig] = useRecoilState(pageConfigAtom)
  const [previousPageConfig, setPreviousPageConfig] = useState<PageConfig>({ ...pageConfig })
  const id = blockSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()
  const gridNum = pageConfigSelectors.useGridNumSelector()
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
    </StyledPage>
  )
}

const StyledPage = styled.div<{ keyframes: Keyframes }>`
  animation: ${(props) => props.keyframes};
  min-width: 960px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px darkgrey, -1px 0 10px darkgrey;
  position: absolute;
  width: 100%;
`

export default Page