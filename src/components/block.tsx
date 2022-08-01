import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import { CELL_LENGTH } from '../constants/pageSize'
import { Block, blocksActions, blocksSelectors } from '../states/block'
import { BlockUtil } from '../utils/block'
import { inputActions } from '../states/input'

const StyledBlockSelection = styled.div<{ block: Block }>`
  top: ${(props) => props.block.position.row * CELL_LENGTH}px;
  left: ${(props) => props.block.position.col * CELL_LENGTH}px;
  width: ${(props) => CELL_LENGTH + (props.block.width - 1) * CELL_LENGTH}px;
  height: ${(props) => CELL_LENGTH + (props.block.height - 1) * CELL_LENGTH}px;
  min-height: ${CELL_LENGTH - 1}px;
  min-width: ${CELL_LENGTH - 1}px;
  position: absolute;
  background-color: cornflowerblue;
  opacity: 0.3;
`

const StyledBlockWrapper = styled.div<{ block: Block }>`
  top: ${(props) => props.block.position.row * CELL_LENGTH}px;
  left: ${(props) => props.block.position.col * CELL_LENGTH}px;
  width: ${(props) => CELL_LENGTH - 1 + (props.block.width - 1) * CELL_LENGTH}px;
  height: ${(props) => CELL_LENGTH - 1 + (props.block.height - 1) * CELL_LENGTH}px;
  min-height: ${CELL_LENGTH - 1}px;
  min-width: ${CELL_LENGTH - 1}px;
  margin: -1px 0 0 -1px;
  border-radius: 3px;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const StyledBlock = styled.div`
  outline: none;
  white-space: nowrap;
  line-height: ${CELL_LENGTH}px;
  margin-top: -1px;
`

type Props = {
  id: string
}

function BlockJSX({ id }: Props) {
  const block = blocksSelectors.useBlockById(id) as Block
  const nextBlock = blocksSelectors.useNextBlock(id)
  const changeBlockSize = blocksActions.useChangeBlockSize()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const addBlock = blocksActions.useAddBlock()
  const setInputValue = inputActions.useSetInputValue()
  const blockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (block.editing) {
      const blockdiv = document.getElementById(`block-${id}`) as HTMLDivElement
      blockdiv.focus()
    }
  }, [id, block.editing])

  return (
    <>
      <StyledBlockSelection
        block={block}
        style={{
          display: block.isSelected ? 'block' : 'none',
        }}
      />
      <StyledBlockWrapper
        id={`block-${id}-wrapper`}
        block={block}
        style={{
          // eslint-disable-next-line no-nested-ternary
          border: block.isSelected ? '2px dotted cornflowerblue' : block.editing ? '2px solid gray' : '2px dashed gray',
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => BlockUtil.handleOnClick({ e, id })}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
          BlockUtil.handleOnKeyDownWrapper({
            e,
            id,
            block,
            nextBlock,
            changeBlockPosition,
            changeBlockStatus,
            setInputValue,
            blockDOM: blockRef.current!,
          })
        }
      >
        <StyledBlock
          id={`block-${id}`}
          contentEditable
          ref={blockRef}
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            BlockUtil.handleOnInput({
              e,
              id,
              changeBlockSize,
            })
          }
          onKeyDown={(e) => BlockUtil.handleOnKeyDown({ e, block, changeBlockStatus, addBlock, setInputValue })}
          onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => BlockUtil.handleOnPaste({ e })}
          onKeyUp={(e) => BlockUtil.handleOnKeyUp({ e, block, changeBlockStatus })}
        />
      </StyledBlockWrapper>
    </>
  )
}

export default BlockJSX
