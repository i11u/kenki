import styled from 'styled-components'
import React from 'react'
import { CELL_LENGTH } from '../constants/pageSize'
import { UnsettledBlock, unsettledBlockAction, unsettledBlockSelectors } from '../states/unsettledBlock'
import { Block } from '../states/block'

const StyledUnsettledBlockWrapper = styled.div<{ block: Block }>`
  top: ${(props) => props.block.position.row * CELL_LENGTH}px;
  left: ${(props) => props.block.position.col * CELL_LENGTH}px;
  width: ${(props) => CELL_LENGTH - 1 + (props.block.width - 1) * CELL_LENGTH}px;
  height: ${(props) => CELL_LENGTH - 1 + (props.block.height - 1) * CELL_LENGTH}px;
  min-height: ${CELL_LENGTH - 1}px;
  min-width: ${CELL_LENGTH - 1}px;
  margin: -1px 0 0 -1px;
  border: 2px solid gray;
  border-radius: 3px;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
`

const StyledUnsettledBlock = styled.div`
  outline: none;
  white-space: nowrap;
  line-height: ${CELL_LENGTH}px;
  margin-top: -1px;
`

type Props = {
  userId: string
}

/**
 * On html, UnsettledBlock (ub) is a empty content-editable div.
 * You move ub around by pressing arrow keys or clicking on cells.
 * If you start typing, texts will inflate in ub.
 * When you finish typing and get out of the ub,
 * the current state will be stored in blocks and then ub will be empty again.
 * */
function UnsettledBlockJSX({ userId }: Props) {
  const unsettledBlock = unsettledBlockSelectors.useUnsettledBlockById(userId) as UnsettledBlock
  const changeUnsettledBlockSize = unsettledBlockAction.useUnsettledBlockSize()
  const changeUnsettledBlockPos = unsettledBlockAction.useChangeUnsettledBlockPos()

  return (
    <div />
    // <StyledUnsettledBlockWrapper
    //   id={`unsettled-block-${userId}-cursor`}
    //   block={unsettledBlock.block}
    //   onClick={(e: React.MouseEvent<HTMLDivElement>) => handleOnClick({ e, userId })}
    //   onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
    //     handleOnKeyDown({
    //       e,
    //       userId,
    //       unsettledBlock,
    //       changeUnsettledBlockPos,
    //     })
    //   }
    // >
    //   <StyledUnsettledBlock
    //     id={`unsettled-block-${userId}`}
    //     contentEditable
    //     onInput={(e: React.FormEvent<HTMLDivElement>) => handleOnInput({ e, userId, changeUnsettledBlockSize })}
    //     onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => handleOnPaste({ e })}
    //   />
    // </StyledUnsettledBlockWrapper>
  )
}

export default UnsettledBlockJSX
