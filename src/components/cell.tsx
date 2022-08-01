import styled from 'styled-components'
import React from 'react'
import { CELL_LENGTH, MAX_COL, MAX_ROW } from '../constants/pageSize'
import { CellUtil } from '../utils/cellUtil'
import { blocksActions, blocksSelectors } from '../states/block'

const StyledCell = styled.textarea`
  @keyframes rendered {
    0% {
      background-color: white;
    }
    100% {
      background-color: yellow;
    }
  }

  animation: rendered 1s ease;
  animation-iteration-count: 1;

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
    borderTop: `1px solid darkgray`,
    borderLeft: `1px solid darkgray`,
    borderBottom: isLastRow ? `1px solid darkgray` : '',
    borderRight: isLastCol ? `1px solid darkgray` : '',
  }

  const id = blocksSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()

  return (
    <StyledCell
      id={`cell-${row}-${col}`}
      key={`cell-${row}-${col}`}
      style={style}
      onMouseDown={() => {
        CellUtil.handleOnMouseDown({
          row,
          col,
          id,
          changeBlockStatus,
          changeBlockPosition,
          addBlock,
        })
      }}
      readOnly
    />
  )
}

export default CellJSX
