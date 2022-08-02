import React from 'react'
import { AspectRatio } from '../states/page'
import { Position } from '../types/position'
import { Block } from '../states/block'
import { BlockUtil } from './block'

export class PageUtil {
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

  public static getAspectRatio = (aspectRatio: AspectRatio) => aspectRatio.height / aspectRatio.width

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
    id: string
    changeBlockStatus: (blockId: string, isEmpty: boolean, isSelected: boolean, editing: boolean) => void
    changeBlockPosition: (id: string, position: Position) => void
    addBlock: (block: Block) => void
  }) => {
    const blockDiv = document.getElementById(`block-${id}`) as HTMLDivElement
    const { row, col } = PageUtil.getPositionFromMouseDownEvent(e, gridNum)

    if (blockDiv.textContent === '') {
      changeBlockPosition(id, { row, col })
      setTimeout(() => {
        blockDiv.focus()
      }, 0)
      return
    }

    changeBlockStatus(id, false, false, false)
    addBlock(BlockUtil.emptyBlock({ position: { row, col } }))
  }
}
