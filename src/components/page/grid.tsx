import styled from 'styled-components'
import React from 'react'
import {pageConfigSelectors} from '../../jotai-hooks/pageConfig/selector'

/*
 * GridJSX represents readonly grid pattern.
 * This component should not re-render when typing thus memoized.
 * */
const Grid = React.memo(() => {
  const gridNum = pageConfigSelectors.useGridNum()

  return (
    <>
      {Array.from(Array(gridNum.colNum).keys()).map((col) => (
        <VerticalLine key={`vertical-line-${col}`} col={col} colNum={gridNum.colNum} rowNum={gridNum.rowNum} />
      ))}
      {Array.from(Array(gridNum.rowNum).keys()).map((row) => (
        <HorizontalLine key={`horizontal-line-${row}`} row={row} colNum={gridNum.colNum} rowNum={gridNum.rowNum} />
      ))}
    </>
  )
})

const VerticalLine = styled.div<{ col: number; rowNum: number; colNum: number }>`
  position: absolute;
  width: 1px;
  height: 100%;
  left: ${(props) => (100 / props.colNum) * props.col}%;
  background-color: #efefef;
  pointer-events: none;
`

const HorizontalLine = styled.div<{ row: number; rowNum: number; colNum: number }>`
  position: absolute;
  width: 100%;
  height: 1px;
  top: ${(props) => (100 / props.rowNum) * props.row}%;
  background-color: #efefef;
  pointer-events: none;
`

export default Grid
