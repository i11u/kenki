import React, { useCallback, useEffect, useState } from 'react'
import styled, { css, FlattenSimpleInterpolation, keyframes } from 'styled-components'
import { useRecoilState } from 'recoil'
import { aspectRatioValue, PageConfig, pageConfigAtom, pageConfigSelectors } from '../states/page'
import { PageUtil } from '../utils/page'
import { blocksActions, blocksSelectors } from '../states/block'
import BlocksJSX from './blocks'
import GridJSX from './grid'

function Page() {
  const [pageConfig, setPageConfig] = useRecoilState(pageConfigAtom)
  const [previousPageConfig, setPreviousPageConfig] = useState({ ...pageConfig })
  const id = blocksSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()
  const gridNum = pageConfigSelectors.useGridNumSelector()

  const animations = () => {
    const kf = keyframes`
          from {
            // The percentage of margin-top, margin-bottom is relative to its parent's width, not height.
            transform: scale(${previousPageConfig.scale});
            transform-origin: ${
              // eslint-disable-next-line no-nested-ternary,no-restricted-globals
              pageConfig.scale *
                PageUtil.getAspectRatio(aspectRatioValue(previousPageConfig.aspectRatio)) *
                // eslint-disable-next-line no-restricted-globals
                screen.width <
              // eslint-disable-next-line no-restricted-globals
              screen.height
                ? 'center'
                : previousPageConfig.scale < 1
                ? 'top'
                : 'center'
            };
            margin-top: ${
              previousPageConfig.scale < 1
                ? 0
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
              // eslint-disable-next-line no-nested-ternary,no-restricted-globals
              pageConfig.scale * PageUtil.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio)) * screen.width <
              // eslint-disable-next-line no-restricted-globals
              screen.height
                ? 'center'
                : pageConfig.scale < 1
                ? 'top'
                : 'center'
            };
            margin-top: ${
              pageConfig.scale < 1
                ? 0
                : 50 * (pageConfig.scale - 1) * PageUtil.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio))
            }%;
            margin-left: ${pageConfig.scale < 1 ? 0 : 50 * (pageConfig.scale - 1)}%;
          }
        `

    return css`
      animation: ${kf};
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-timing-function: step-start;
    `
  }

  let throttlePause: boolean

  const throttle = useCallback((callback: () => void, time: number) => {
    // don't run the function if throttlePause is true
    if (throttlePause) return

    // set throttlePause to true after the if condition. This allows the function to be run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    throttlePause = true

    // setTimeout runs the callback within the specified time
    setTimeout(() => {
      callback()

      // throttlePause is set to false once the function has been called, allowing the throttle function to loop
      throttlePause = false
    }, time)
  }, [])

  useEffect(() => {
    ;(document.getElementById('page') as HTMLDivElement).addEventListener(
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
  }, [throttle, setPreviousPageConfig, setPageConfig, pageConfig.aspectRatio])

  useEffect(() => {
    const handleOnResize = () => {
      const pageDOM = document.getElementById('page') as HTMLDivElement
      pageDOM.style.fontSize = `${pageDOM.clientHeight / gridNum.rowNum - 5}px`
      pageDOM.style.lineHeight = `${pageDOM.clientHeight / gridNum.rowNum}px`
    }
    const resizeObserver = new ResizeObserver(() => handleOnResize())
    resizeObserver.observe(document.getElementById('page') as HTMLElement)
  }, [gridNum.rowNum])

  return (
    <StyledPage
      id="page"
      pageConfig={pageConfig}
      keyframes={animations()}
      onMouseDown={(e) =>
        e.target === (document.getElementById('page') as HTMLDivElement)
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
      <GridJSX />
      <BlocksJSX />
    </StyledPage>
  )
}

const StyledPage = styled.div<{ pageConfig: PageConfig; keyframes: FlattenSimpleInterpolation }>`
  ${(props) => props.keyframes}
  min-width: 960px;
  background-color: #ffffff;
  box-shadow: 5px 5px 10px darkgrey, -1px 0 10px darkgrey;
  position: absolute;
  width: 100%;
  aspect-ratio: ${(props) => 1 / PageUtil.getAspectRatio(aspectRatioValue(props.pageConfig.aspectRatio))};
`

export default Page
