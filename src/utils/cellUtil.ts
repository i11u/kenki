import { Position } from '../types/position'
import { MAX_COL, MAX_ROW } from '../constants/pageSize'
import { Block } from '../states/block'
import { UnsettledBlock } from '../states/unsettledBlock'

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
    userId,
    unsettledBlock,
    changeUnsettledBlockPosition,
    changeUnsettledBlockSize,
    addBlock,
  }: {
    row: number
    col: number
    userId: string
    unsettledBlock: UnsettledBlock
    changeUnsettledBlockPosition: (userId: string, position: Position) => void
    changeUnsettledBlockSize: (userId: string, width: number, height: number) => void
    addBlock: (block: Block) => void
  }) => {
    const unsettledBlockDiv = document.getElementById(`unsettled-block-${userId}`) as HTMLDivElement
    if (unsettledBlockDiv.textContent === '') {
      changeUnsettledBlockPosition(userId, { row, col })
      setTimeout(() => {
        unsettledBlockDiv.focus()
      }, 0)
      return
    }

    const newContent = document.createElement('div')
    newContent.contentEditable = 'true'
    newContent.innerHTML = unsettledBlockDiv.innerHTML
    console.log(newContent)

    addBlock({ ...unsettledBlock.block, content: newContent })

    unsettledBlockDiv.innerHTML = ''

    changeUnsettledBlockPosition(userId, { row, col })
    changeUnsettledBlockSize(userId, 1, 1)

    setTimeout(() => {
      unsettledBlockDiv.focus()
    }, 0)
  }
}
