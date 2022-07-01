import styled from 'styled-components'
import React from 'react'
import { CELL_LENGTH, MAX_COL, MAX_ROW } from '../constants/pageSize'
import { unsettledBlockAction } from '../states/unsettledBlock'
import { handleOnCellMouseDown } from '../utils/cellUtil'
import { getUserId } from '../utils/authUtil'

const StyledCell = styled.textarea`
  width: ${CELL_LENGTH - 1}px;
  height: ${CELL_LENGTH - 1}px;
  font-size: ${CELL_LENGTH - 2}px;
  outline: none;
  text-align: center;
  padding: 1px 0 0 0;
  border: none;
  vertical-align: top;
  resize: none;
  font-family: inherit;
  line-height: 1;
`

type Props = {
  row: number
  col: number
}

function CellJSX({ row, col }: Props) {
  const isLastRow = row === MAX_ROW - 1
  const isLastCol = col === MAX_COL - 1

  const style = {
    borderTop: `1px solid lightgrey`,
    borderLeft: `1px solid lightgrey`,
    borderBottom: isLastRow ? `1px solid lightgrey` : '',
    borderRight: isLastCol ? `1px solid lightgrey` : '',
  }

  const changeUnsettledBlockPos = unsettledBlockAction.useChangeUnsettledBlockPos()
  const userId = getUserId()

  const handleOnMouseDown = () => handleOnCellMouseDown({ row, col, userId, changeCursorPos: changeUnsettledBlockPos })

  return (
    <StyledCell
      id={`cell-${row}-${col}`}
      style={style}
      onMouseDown={() => {
        handleOnMouseDown()
      }}
      readOnly
    />
  )
}

export default CellJSX
