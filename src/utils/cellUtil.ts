import { Position } from '../types/position'
import { MAX_COL, MAX_ROW } from '../constants/pageSize'
import block from '../components/block'

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
    changeCurrentBlockPosition,
  }: {
    row: number
    col: number
    changeCurrentBlockPosition: (pos: Position) => void
  }) => {
    changeCurrentBlockPosition({ row, col })
    const cursor = document.getElementById(`block-1`) as HTMLDivElement
    cursor.style.display = 'block'
    setTimeout(() => {
      cursor.focus()
    }, 0)
  }
}
