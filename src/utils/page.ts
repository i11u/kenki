import React, { RefObject } from 'react'
import { keyframes, Keyframes } from 'styled-components'
import { BlockUtils } from './block'
import { Block, Position } from '../jotai-hooks/blocks/atom'
import { AspectRatio, AspectRatioType, aspectRatioValue, PageConfig } from '../jotai-hooks/pageConfig/atom'

export class PageUtils {
  /*
   * Aspect ratio = height / width
   * */
  public static getAspectRatio = (aspectRatio: AspectRatio) => aspectRatio.height / aspectRatio.width

  public static style = (aspectRatio: AspectRatioType): React.CSSProperties => ({
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationTimingFunction: 'step-start',
    aspectRatio: `${1 / PageUtils.getAspectRatio(aspectRatioValue(aspectRatio))}`,
  })

  public static keyframes = (
    pageRef: RefObject<HTMLDivElement>,
    sidebarIsOpen: boolean | undefined,
    previousPageConfig: PageConfig,
    pageConfig: PageConfig
  ): Keyframes => keyframes`
      from {
        // The percentage of margin-top, margin-bottom is relative to its parent's width, not height.
        transform: scale(${
          sidebarIsOpen || (pageRef.current?.scrollHeight as number) < window.screen.height * 0.95
            ? previousPageConfig.scale * 0.95
            : previousPageConfig.scale
        });
        transform-origin: ${
          pageConfig.scale *
            PageUtils.getAspectRatio(aspectRatioValue(previousPageConfig.aspectRatio)) *
            window.screen.width <
          window.screen.height
            ? 'center'
            : previousPageConfig.scale < 1
            ? 'top'
            : 'center'
        };
        margin-top: ${
          previousPageConfig.scale *
            PageUtils.getAspectRatio(aspectRatioValue(previousPageConfig.aspectRatio)) *
            window.screen.width <
          window.screen.height
            ? 0
            : previousPageConfig.scale < 1
            ? 1
            : 50 *
              (previousPageConfig.scale - 1) *
              PageUtils.getAspectRatio(aspectRatioValue(previousPageConfig.aspectRatio))
        }%;
        margin-left: ${previousPageConfig.scale < 1 ? 0 : 50 * (previousPageConfig.scale - 1)}%;
      }

      to {
        // The percentage of margin-top, margin-bottom is relative to its parent's width, not height.
        transform: scale(${
          sidebarIsOpen || (pageRef.current?.scrollHeight as number) < window.screen.height * 0.95
            ? pageConfig.scale * 0.95
            : pageConfig.scale
        });
        transform-origin: ${
          pageConfig.scale * PageUtils.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio)) * window.screen.width <
          window.screen.height
            ? 'center'
            : pageConfig.scale < 1
            ? 'top'
            : 'center'
        };
        margin-top: ${
          pageConfig.scale * PageUtils.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio)) * window.screen.width <
          window.screen.height
            ? 0
            : pageConfig.scale < 1
            ? 1
            : 50 * (pageConfig.scale - 1) * PageUtils.getAspectRatio(aspectRatioValue(pageConfig.aspectRatio))
        }%;
        margin-left: ${pageConfig.scale < 1 ? 0 : 50 * (pageConfig.scale - 1)}%;
      }
    `

  public static handleOnMouseDown = ({
    e,
    gridNum,
    id,
    changeBlockStatus,
    changeBlockPosition,
    addBlock,
  }: {
    e: React.MouseEvent<HTMLDivElement>
    gridNum: { rowNum: number; colNum: number }
    id: string | undefined
    changeBlockStatus: ({
      blockId,
      isEmpty,
      isSelected,
      editing,
    }: {
      blockId: string
      isEmpty: boolean
      isSelected: boolean
      editing: boolean
    }) => void
    changeBlockPosition: ({ blockId, position }: { blockId: string; position: Position }) => void
    addBlock: ({ block }: { block: Block }) => void
  }) => {
    if (id === undefined) return
    const blockDiv = document.getElementById(`block-${id}`) as HTMLDivElement
    const { row, col } = PageUtils.getPositionFromMouseDownEvent(e, gridNum)

    if (blockDiv.textContent === '') {
      changeBlockPosition({ blockId: id, position: { row, col } })
      setTimeout(() => {
        blockDiv.focus()
      }, 0)
      return
    }

    changeBlockStatus({ blockId: id, isEmpty: false, isSelected: false, editing: false })
    addBlock({ block: BlockUtils.emptyBlock({ position: { row, col } }) })
  }

  public static getPositionFromMouseDownEvent = (
    e: React.MouseEvent<HTMLDivElement>,
    gridNum: {
      rowNum: number
      colNum: number
    }
  ): Position => ({
    row: Math.floor(e.nativeEvent.offsetY / ((e.target as HTMLDivElement).clientHeight / gridNum.rowNum)),
    col: Math.floor(e.nativeEvent.offsetX / ((e.target as HTMLDivElement).clientWidth / gridNum.colNum)),
  })
}
