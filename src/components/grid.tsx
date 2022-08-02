/*
 * GridJSX represents readonly grid pattern. This component should re-render
 * only when grid color is changed.
 * */
import styled from 'styled-components'
import React from 'react'
import { pageConfigSelectors } from '../states/page'

const GridJSX = React.memo(() => {
  const gridNum = pageConfigSelectors.useGridNumSelector()

  return (
    <>
      {Array.from(Array(gridNum.colNum).keys()).map((col, colIdx) => (
        <StyledVerticalLine key={`horizontal-line-${col}`} col={col} colNum={gridNum.colNum} rowNum={gridNum.rowNum} />
      ))}
      {Array.from(Array(gridNum.rowNum).keys()).map((row, rowIdx) => (
        <StyledHorizontalLine
          key={`horizontal-line-${row}`}
          row={row}
          colNum={gridNum.colNum}
          rowNum={gridNum.rowNum}
        />
      ))}
    </>
  )
})

const StyledVerticalLine = styled.div<{ col: number; rowNum: number; colNum: number }>`
  position: absolute;
  width: 1px;
  height: 100%;
  left: ${(props) => (100 / props.colNum) * props.col}%;
  background-color: #e5e4e2;
  pointer-events: none;
`

const StyledHorizontalLine = styled.div<{ row: number; rowNum: number; colNum: number }>`
  position: absolute;
  width: 100%;
  height: 1px;
  top: ${(props) => (100 / props.rowNum) * props.row}%;
  background-color: #e5e4e2;
  pointer-events: none;
`

export default GridJSX
