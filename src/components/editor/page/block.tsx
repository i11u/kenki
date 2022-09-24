import styled from 'styled-components'
import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PrimitiveAtom, useAtomValue } from 'jotai'
import { BlockUtils } from '../../../utils/block'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { blocksActions, useRemoveBlock, useUpdateInnerHTML } from '../../../jotai-hooks/blocks/action'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { Block, Position } from '../../../jotai-hooks/blocks/atom'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

const StyledBlockSelection = styled.div`
  position: absolute;
  background-color: cornflowerblue;
  opacity: 0.3;
  z-index: 3;
`

const StyledBlockWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
`

const StyledBlock = styled.div`
  outline: none;
  white-space: nowrap;
  font-family: '凸版文久ゴシック', serif;
  text-justify: inter-ideograph;
  z-index: 1;
`

const BlockTSX = memo(({ blockAtom }: { blockAtom: PrimitiveAtom<Block> }) => {
  const block = useAtomValue(blockAtom)
  const nextBlock = {
    id: blockSelectors.useNextBlockId(block.id),
    isEmpty: blockSelectors.useNextBlockIsEmpty(block.id),
  }
  const changeBlockSize = blocksActions.useChangeBlockSize()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const addBlock = blocksActions.useAddBlock()
  const blockRef = useRef<HTMLDivElement>(null)
  const innerHTMLRef = useRef(block.innerHTML)
  const gridNum = pageConfigSelectors.useGridNum()
  const changeScale = pageConfigActions.useChangeScale()
  const mode = modeSelectors.useCurrentMode()
  const colorTheme = colorThemeSelector.useColorTheme()
  const [previousPosition, setPreviousPosition] = useState<Position>(block.position)
  const updateInnerHTML = useUpdateInnerHTML()
  const removeBlock = useRemoveBlock()

  useEffect(() => {
    if (mode === 'NORMAL' && !block.isSelected && !block.editing && block.innerHTML === '') {
      console.log()
      removeBlock(block.id)
    }
  }, [block, mode, removeBlock])

  /*
   * Update previousPosition
   * */
  useEffect(() => setPreviousPosition(block.position), [block])

  /*
   * Return to the previous block position when new position is out of the range
   * */
  useLayoutEffect(() => {
    if (
      block.position.col < 0 ||
      block.position.col >= gridNum.colNum ||
      block.position.row < 0 ||
      block.position.row >= gridNum.rowNum
    ) {
      window.alert('position is out of range')
      changeBlockPosition({ blockId: block.id, position: previousPosition })
    }
  }, [
    block.id,
    block.position.col,
    block.position.row,
    changeBlockPosition,
    gridNum.colNum,
    gridNum.rowNum,
    previousPosition,
  ])

  /*
   * When block.editing is true, then the contenteditable element automatically gets focused.
   * */
  useEffect(() => {
    if (block.editing) {
      setTimeout(() => blockRef.current?.focus(), 0)
    } else {
      setTimeout(() => blockRef.current?.blur(), 0)
    }
  }, [block.editing, mode])

  const blockBorderIsVisible = pageConfigSelectors.useBlockBorderIsVisible()

  const style = BlockUtils.style(block, gridNum, blockBorderIsVisible)

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
        id={`block-${block.id}-wrapper`}
        className="block-wrapper"
        style={{
          ...style,
          borderWidth: blockBorderIsVisible ? '1px' : '0px',
          borderColor: colorTheme.blockBorder,
          borderStyle: mode === 'SELECT' && block.isSelected ? 'dotted' : 'solid',
          backgroundColor: colorTheme.background,
          color: colorTheme.textPrimary,
          opacity: mode === 'SELECT' && !block.isSelected ? '0.2' : '',
        }}
        onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) =>
          BlockUtils.handleOnDoubleClick({
            e,
            id: block.id,
            changeScale,
          })
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
          BlockUtils.handleOnKeyDownWrapper({
            e,
            id: block.id,
            block,
            nextBlock,
            changeBlockPosition,
            changeBlockStatus,
            blockDOM: blockRef.current as HTMLDivElement,
            rowNum: gridNum.rowNum,
            colNum: gridNum.colNum,
          })
        }
      >
        <StyledBlock
          id={`block-${block.id}`}
          className="block"
          contentEditable
          // dangerouslySetInnerHTML={{ __html: innerHTMLRef.current }}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          aria-autocomplete="none"
          ref={blockRef}
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            BlockUtils.handleOnInput({
              e,
              id: block.id,
              changeBlockSize,
              cellLength: (document.getElementById('page') as HTMLDivElement).clientWidth / gridNum.colNum,
              updateInnerHTML,
            })
          }
          // onKeyDown={(e) =>
          //   BlockUtils.handleOnKeyDown({
          //     e,
          //     block,
          //     changeBlockStatus,
          //     addBlock,
          //     rowNum: gridNum.rowNum,
          //     colNum: gridNum.colNum,
          //   })
          // }
          onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => BlockUtils.handleOnPaste({ e })}
          // onKeyUp={(e) => BlockUtils.handleOnKeyUp({ e, block, changeBlockStatus })}
        >
          {innerHTMLRef.current}
        </StyledBlock>
      </StyledBlockWrapper>
    </>
  )
})

export default BlockTSX
