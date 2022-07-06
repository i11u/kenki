import { Position } from '../types/position'
import { CellUtil } from '../utils/cellUtil'
import { CELL_LENGTH } from '../constants/pageSize'
import CellJSX from './cell'

function CellsJSX() {
  const grid: Position[][] = CellUtil.getInitialCells()

  return (
    <>
      {grid.map((row, rowIdx) => (
        <div key={`row-${grid[rowIdx][0].row}`} style={{ height: CELL_LENGTH }}>
          {row.map((cell, colIdx) => (
            <CellJSX key={`${cell.row}-${cell.col}`} row={cell.row} col={cell.col} />
          ))}
        </div>
      ))}
    </>
  )
}

export default CellsJSX
