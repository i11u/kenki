import styled from 'styled-components'
import React from 'react'
import { CELL_LENGTH, MAX_COL, MAX_ROW } from '../constants/pageSize'
import { CellUtil } from '../utils/cellUtil'
import { UnsettledBlock, unsettledBlockAction, unsettledBlockSelectors } from '../states/unsettledBlock'
import { getUserId } from '../utils/authUtil'
import { blocksActions } from '../states/block'

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

  const userId = getUserId()
  const changeUnsettledBlockPosition = unsettledBlockAction.useChangeUnsettledBlockPos()
  const unsettledBlock = unsettledBlockSelectors.useUnsettledBlockById(userId) as UnsettledBlock
  const changeUnsettledBlockSize = unsettledBlockAction.useUnsettledBlockSize()
  const addBlock = blocksActions.useAddBlock()

  return (
    <StyledCell
      id={`cell-${row}-${col}`}
      style={style}
      onMouseDown={() => {
        CellUtil.handleOnMouseDown({
          row,
          col,
          userId,
          unsettledBlock,
          changeUnsettledBlockPosition,
          changeUnsettledBlockSize,
          addBlock,
        })
      }}
      readOnly
    />
  )
}

export default CellJSX
