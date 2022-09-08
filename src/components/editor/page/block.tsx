import styled from 'styled-components'
import React, { memo, useEffect, useRef } from 'react'
import { PrimitiveAtom, useAtomValue } from 'jotai'
import { BlockUtils } from '../../../utils/block'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { blocksActions } from '../../../jotai-hooks/blocks/action'
import { pageConfigActions } from '../../../jotai-hooks/pageConfig/action'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { Block } from '../../../jotai-hooks/blocks/atom'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'

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
  border-color: gray;
  border-width: 1px;
  z-index: 2;
  background-color: #edecea;
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
  const gridNum = pageConfigSelectors.useGridNum()
  const changeScale = pageConfigActions.useChangeScale()
  const mode = modeSelectors.useCurrentMode()

  /*
   * When block.editing is true, then the contenteditable element automatically gets focused.
   * */
  useEffect(() => {
    if (block.editing) setTimeout(() => blockRef.current?.focus(), 0)
    if (!block.editing) setTimeout(() => blockRef.current?.blur(), 0)
  }, [block.editing])

  const style = BlockUtils.style(block, gridNum)

  return (
    <>
      <StyledBlockSelection
        style={{
          ...style,
          width: `calc(${style.width} + 2px)`,
          height: `calc(${style.height} + 2px)`,
          minWidth: `calc(${style.minWidth} + 2px)`,
          minHeight: `calc(${style.minHeight} + px)`,
          display: mode === 'SELECT' && block.isSelected ? '' : 'none',
        }}
      />
      <StyledBlockWrapper
        id={`block-${block.id}-wrapper`}
        className="block"
        style={{ ...style, borderStyle: mode === 'SELECT' && block.isSelected ? 'dotted' : 'solid' }}
        onDoubleClick={(e: React.MouseEvent<HTMLDivElement>) =>
          BlockUtils.handleOnClick({
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
          contentEditable
          ref={blockRef}
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            BlockUtils.handleOnInput({
              e,
              id: block.id,
              changeBlockSize,
              cellLength: (document.getElementById('page') as HTMLDivElement).clientWidth / gridNum.colNum,
            })
          }
          onKeyDown={(e) =>
            BlockUtils.handleOnKeyDown({
              e,
              block,
              changeBlockStatus,
              addBlock,
              rowNum: gridNum.rowNum,
              colNum: gridNum.colNum,
            })
          }
          onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => BlockUtils.handleOnPaste({ e })}
          onKeyUp={(e) => BlockUtils.handleOnKeyUp({ e, block, changeBlockStatus })}
        />
      </StyledBlockWrapper>
    </>
  )
})

export default BlockTSX
