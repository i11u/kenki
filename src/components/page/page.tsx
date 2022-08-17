import React, { useEffect, useRef, useState } from 'react'
import styled, { Keyframes, keyframes } from 'styled-components'
import { useRecoilState } from 'recoil'
import { PageUtil } from '../../utils/page'
import Blocks from './blocks'
import { blockSelectors } from '../../recoil-hooks/blocks/selector'
import { blocksActions } from '../../recoil-hooks/blocks/action'
import { aspectRatioValue, PageConfig, pageConfigAtom } from '../../recoil-hooks/pageConfig/atom'
import { pageConfigSelectors } from '../../recoil-hooks/pageConfig/selector'
import useOnResizeEffect from '../../hooks/useOnResizeEffect'
import useThrottleCallback from '../../hooks/useThrottleCallback'
import Grid from './grid'

function Page() {
  const [pageConfig, setPageConfig] = useRecoilState(pageConfigAtom)
  const [previousPageConfig, setPreviousPageConfig] = useState({ ...pageConfig })
  const id = blockSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()
  const gridNum = pageConfigSelectors.useGridNumSelector()
  const pageRef = useRef<HTMLDivElement>(null)
  useOnResizeEffect(gridNum.rowNum, pageRef)

  const kf = keyframes`
      from {
        // The percentage of margin-top, margin-bottom is relative to its parent's width, not height.
        transform: scale(${previousPageConfig.scale});
        transform-origin: ${
          pageConfig.scale *
            PageUtil.getAspectRatio(aspectRatioValue(previousPageConfig.aspectRatio)) *
            window.screen.width <
          window.screen.height
            ? 'center'
            : previousPageConfig.scale < 1
            ? 'top'
            : 'center'
        };
        margin-top: ${
          previousPageConfig.scale *
            PageUtil.getAspectRatio(aspectRatioValue(previousPageConfig.aspectRatio)) *
            window.screen.width <
          window.screen.height
            ? 0
            : previousPageConfig.scale < 1
            ? 1
            : 50 *
              (previousPageConfig.scale - 1) *
              PageUtil.getAspectRatio(aspectRatioValue(previousPageConfig.aspectRatio))
        }%;
        margin-left: ${previousPageConfig.scale < 1 ? 0 : 50 * (previousPageConfig.scale - 1)}%;
      }

      to {
        // The percentage of margin-top, margin-bottom is relative to its parent's width, not height.
        transform: scale(${pageConfig.scale});
        transform-origin: ${
          pageConfig.scale * PageUtil.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio)) * window.screen.width <
          window.screen.height
            ? 'center'
            : pageConfig.scale < 1
            ? 'top'
            : 'center'
        };
        margin-top: ${
          pageConfig.scale * PageUtil.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio)) * window.screen.width <
          window.screen.height
            ? 0
            : pageConfig.scale < 1
            ? 1
            : 50 * (pageConfig.scale - 1) * PageUtil.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio))
        }%;
        margin-left: ${pageConfig.scale < 1 ? 0 : 50 * (pageConfig.scale - 1)}%;
      }
    `

  const style = {
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'step-start',
    aspectRatio: `${1 / PageUtil.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio))}`,
  }

  const throttle = useThrottleCallback()

  useEffect(() => {
    pageRef.current?.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
          if (e.deltaY < 0) {
            throttle(
              () =>
                setPageConfig((prev: PageConfig) => {
                  if (prev.scale >= 2) return prev
                  setPreviousPageConfig(prev)
                  return { ...prev, scale: prev.scale + 0.1 }
                }),
              0.001
            )
          } else {
            throttle(
              () =>
                setPageConfig((prev: PageConfig) => {
                  if (prev.scale <= 0.35) return prev
                  setPreviousPageConfig(prev)
                  return { ...prev, scale: prev.scale - 0.05 }
                }),
              0.001
            )
          }
        }
      },
      { passive: false }
    )
  }, [setPreviousPageConfig, setPageConfig, pageConfig.aspectRatio, throttle])

  return (
    <StyledPage
      id="page"
      ref={pageRef}
      style={style}
      keyframes={kf}
      onMouseDown={(e) =>
        e.target === pageRef.current
          ? PageUtil.handleOnMouseDown({
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
