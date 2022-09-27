import styled from 'styled-components'
import React from 'react'
import {pageConfigSelectors} from '../../../jotai-hooks/pageConfig/selector'
import {colorThemeSelector} from '../../../jotai-hooks/colorTheme/selector'

/*
 * GridJSX represents readonly grid pattern.
 * This component should not re-render when typing thus memoized.
 * */
const Grid = () => {
  const gridNum = pageConfigSelectors.useGridNum()
  const colorTheme = colorThemeSelector.useColorTheme()
  const gridIsVisible = pageConfigSelectors.useGridIsVisible()

  return (
    <>
      {Array.from(Array(gridNum.colNum).keys()).map((col) => (
        <VerticalLine
          key={`vertical-line-${col}`}
          col={col}
          colNum={gridNum.colNum}
          rowNum={gridNum.rowNum}
          style={{ display: gridIsVisible ? '' : 'none', backgroundColor: colorTheme.grid }}
        />
      ))}
      {Array.from(Array(gridNum.rowNum).keys()).map((row) => (
        <HorizontalLine
          key={`horizontal-line-${row}`}
          row={row}
          colNum={gridNum.colNum}
          rowNum={gridNum.rowNum}
          style={{ display: gridIsVisible ? '' : 'none', backgroundColor: colorTheme.grid }}
        />
      ))}
    </>
  )
}

const VerticalLine = styled.div<{ col: number; rowNum: number; colNum: number }>`
  position: absolute;
  width: 1px;
  height: 100%;
  left: ${(props) => (100 / props.colNum) * props.col}%;
  pointer-events: none;
`

const HorizontalLine = styled.div<{ row: number; rowNum: number; colNum: number }>`
  position: absolute;
  width: 100%;
  height: 1px;
  top: ${(props) => (100 / props.rowNum) * props.row}%;
  pointer-events: none;
`

export default React.memo(Grid)
