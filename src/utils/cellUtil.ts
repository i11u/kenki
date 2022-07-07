import { Position } from '../types/position'
import { MAX_COL, MAX_ROW } from '../constants/pageSize'
import { Block } from '../states/block'
import { BlockUtil } from './block'

export class CellUtil {
  public static getInitialCells = (): Position[][] => {
    const res = []
    for (let row = 0; row < MAX_ROW; row += 1) {
      const currentRow = []
      for (let col = 0; col < MAX_COL; col += 1) {
        currentRow.push({ row, col })
      }
      res.push(currentRow)
    }
    return res
  }

  public static getCell = (row: number, col: number) =>
    document.getElementById(`cell-${row}-${col}`) as HTMLTextAreaElement

  public static getCellFromPos = (pos: Position) => {
    if (!pos) return undefined
    return document.getElementById(`cell-${pos.row}-${pos.col}`) as HTMLTextAreaElement
  }

  /**
   * When a cell is clicked, you change the cursor position.
   * */
  public static handleOnMouseDown = ({
    row,
    col,
    id,
    changeBlockStatus,
    changeBlockPosition,
    addBlock,
  }: {
    row: number
    col: number
    id: string
    changeBlockStatus: (blockId: string, isEmpty: boolean, isSelected: boolean, editing: boolean) => void
    changeBlockPosition: (id: string, position: Position) => void
    addBlock: (block: Block) => void
  }) => {
    const blockDiv = document.getElementById(`block-${id}`) as HTMLDivElement

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
