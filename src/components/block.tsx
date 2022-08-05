import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import { pageConfigActions, pageConfigSelectors } from '../states/page'
import { Block, blocksActions, blocksSelectors } from '../states/block'
import { BlockUtil } from '../utils/block'
import { inputActions } from '../states/input'

const StyledBlockSelection = styled.div<{ block: Block; gridNum: { rowNum: number; colNum: number } }>`
  top: ${(props) => props.block.position.row * (100 / props.gridNum.rowNum)}%;
  left: ${(props) => props.block.position.col * (100 / props.gridNum.colNum)}%;
  width: calc(
    ${(props) => 100 / props.gridNum.colNum}% + ${(props) => (100 / props.gridNum.colNum) * (props.block.width - 1)}%
  );
  height: calc(
    ${(props) => 100 / props.gridNum.rowNum}% + ${(props) => (100 / props.gridNum.rowNum) * (props.block.height - 1)}%
  );
  min-width: ${(props) => 100 / props.gridNum.colNum}%;
  min-height: ${(props) => 100 / props.gridNum.rowNum}%;
  position: absolute;
  background-color: cornflowerblue;
  opacity: 0.3;
`

const StyledBlockWrapper = styled.div<{ block: Block; gridNum: { rowNum: number; colNum: number } }>`
  top: ${(props) => props.block.position.row * (100 / props.gridNum.rowNum)}%;
  left: ${(props) => props.block.position.col * (100 / props.gridNum.colNum)}%;
  width: calc(
    ${(props) => 100 / props.gridNum.colNum}% - 1px +
      ${(props) => (100 / props.gridNum.colNum) * (props.block.width - 1)}%
  );
  height: calc(
    ${(props) => 100 / props.gridNum.rowNum}% - 1px +
      ${(props) => (100 / props.gridNum.rowNum) * (props.block.height - 1)}%
  );
  min-width: ${(props) => 100 / props.gridNum.colNum - 1}%;
  min-height: ${(props) => 100 / props.gridNum.rowNum - 1}%;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
`

const StyledBlock = styled.div<{ gridNum: { rowNum: number; colNum: number } }>`
  outline: none;
  white-space: nowrap;
  font-family: '凸版文久ゴシック';
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
  const gridNum = pageConfigSelectors.useGridNumSelector()
  const changeScale = pageConfigActions.useChangeScale()

  useEffect(() => {
    if (block.editing) {
      const blockDiv = blockRef.current as HTMLDivElement
      setTimeout(() => {
        blockDiv.focus()
      }, 0)
    }
  }, [id, block.editing])

  useEffect(() => {
    const pageDOM = document.getElementById('page') as HTMLDivElement
    pageDOM.style.fontSize = `${pageDOM.clientHeight / gridNum.rowNum - 5}px`
    pageDOM.style.lineHeight = `${pageDOM.clientHeight / gridNum.rowNum}px`
    const handleOnResize = () => {
      pageDOM.style.fontSize = `${pageDOM.clientHeight / gridNum.rowNum - 5}px`
      pageDOM.style.lineHeight = `${pageDOM.clientHeight / gridNum.rowNum}px`
    }
    window.addEventListener('resize', handleOnResize)
  }, [gridNum.rowNum])

  return (
    <>
      <StyledBlockSelection
        block={block}
        gridNum={gridNum}
        style={{
          display: block.isSelected ? 'block' : 'none',
        }}
      />
      <StyledBlockWrapper
        id={`block-${id}-wrapper`}
        block={block}
        gridNum={gridNum}
        style={{
          // eslint-disable-next-line no-nested-ternary
          border: block.isSelected ? '1px dotted cornflowerblue' : block.editing ? '1px solid gray' : '1px dashed gray',
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => BlockUtil.handleOnClick({ e, id, changeScale })}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
          BlockUtil.handleOnKeyDownWrapper({
            e,
            id,
            block,
            nextBlock,
            changeBlockPosition,
            changeBlockStatus,
            setInputValue,
            blockDOM: blockRef.current as HTMLDivElement,
            rowNum: gridNum.rowNum,
            colNum: gridNum.colNum,
          })
        }
      >
        <StyledBlock
          id={`block-${id}`}
          gridNum={gridNum}
          contentEditable
          ref={blockRef}
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            BlockUtil.handleOnInput({
              e,
              id,
              changeBlockSize,
              cellLength: (document.getElementById('page') as HTMLDivElement).clientWidth / gridNum.colNum,
            })
          }
          onKeyDown={(e) =>
            BlockUtil.handleOnKeyDown({
              e,
              block,
              changeBlockStatus,
              addBlock,
              setInputValue,
              rowNum: gridNum.rowNum,
              colNum: gridNum.colNum,
            })
          }
          onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => BlockUtil.handleOnPaste({ e })}
          onKeyUp={(e) => BlockUtil.handleOnKeyUp({ e, block, changeBlockStatus })}
        />
      </StyledBlockWrapper>
    </>
  )
}

export default BlockJSX
