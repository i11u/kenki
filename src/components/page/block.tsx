import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import { BlockUtil } from '../../utils/block'
import { inputActions } from '../../recoil-hooks/input'
import { Block } from '../../recoil-hooks/blocks/atom'
import { blockSelectors } from '../../recoil-hooks/blocks/selector'
import { blocksActions } from '../../recoil-hooks/blocks/action'
import { pageConfigActions } from '../../recoil-hooks/pageConfig/action'
import { pageConfigSelectors } from '../../recoil-hooks/pageConfig/selector'

const StyledBlockSelection = styled.div`
  position: absolute;
  background-color: cornflowerblue;
  opacity: 0.3;
`

const StyledBlockWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  border-color: gray;
  border-width: 1px;
`

const StyledBlock = styled.div`
  outline: none;
  white-space: nowrap;
  font-family: '凸版文久ゴシック', serif;
`

function BlockTSX({ id }: { id: string }) {
  const block = blockSelectors.useBlockById(id) as Block
  const nextBlock = blockSelectors.useNextBlock(id)
  const changeBlockSize = blocksActions.useChangeBlockSize()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const addBlock = blocksActions.useAddBlock()
  const setInputValue = inputActions.useSetInputValue()
  const blockRef = useRef<HTMLDivElement>(null)
  const gridNum = pageConfigSelectors.useGridNumSelector()
  const changeScale = pageConfigActions.useChangeScale()

  /*
   * When block.editing is true, then the contenteditable element automatically gets focused.
   * */
  useEffect(() => {
    if (block.editing) setTimeout(() => blockRef.current?.focus(), 0)
  }, [block.editing])

  const style = BlockUtil.style(block, gridNum)

  return (
    <>
      <StyledBlockSelection
        style={{
          ...style,
          width: `calc(${style.width} + 1px)`,
          height: `calc(${style.height} + 1px)`,
          minWidth: `calc(${style.minWidth} + 1px)`,
          minHeight: `calc(${style.minHeight} + 1px)`,
          display: block.isSelected ? '' : 'none',
        }}
      />
      <StyledBlockWrapper
        id={`block-${id}-wrapper`}
        style={{ ...style, borderStyle: block.isSelected ? 'dotted' : block.editing ? 'solid' : 'dashed' }}
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

export default BlockTSX
