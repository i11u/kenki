import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import { v4 } from 'uuid'
import Icon from '../common/icon'
import searchSvg from '../../assets/icons/search.svg'
import { ContentData } from './sidebar'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import { modeActions } from '../../jotai-hooks/mode/action'
import { relationActions } from '../../jotai-hooks/relations/action'
import { editorConfigActions } from '../../jotai-hooks/editorConfig/action'
import { blockSelectors } from '../../jotai-hooks/blocks/selector'
import { blocksActions } from '../../jotai-hooks/blocks/action'
import { BlockUtils } from '../../utils/block'

const Search = ({
  word,
  setWord,
  buffer,
  setBuffer,
  selectedContentIndex,
  setSelectedContentIndex,
  matchingContents,
}: {
  word: string
  setWord: React.Dispatch<React.SetStateAction<string>>
  buffer: string
  setBuffer: React.Dispatch<React.SetStateAction<string>>
  selectedContentIndex: number
  setSelectedContentIndex: React.Dispatch<React.SetStateAction<number>>
  matchingContents: ContentData[]
}) => {
  const mode = modeSelectors.useCurrentMode()
  const changeMode = modeActions.useSwitchModes()
  const createRelation = relationActions.useAddRelation()
  const toggleSidebar = editorConfigActions.useToggleSidebar()
  const ref = useRef<HTMLInputElement>(null)
  const selectedBlocks = blockSelectors.useSelectedBlocks()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const createBlock = blocksActions.useAddBlock()

  useEffect(() => {
    if (mode === 'INSERT') {
      setTimeout(() => ref.current?.focus(), 0)
    } else {
      setTimeout(() => ref.current?.blur(), 0)
    }
    return function cleanup() {
      setWord('Enter keyword')
      setBuffer('Enter keyword')
      setSelectedContentIndex(-1)
    }
  }, [mode, setBuffer, setWord, setSelectedContentIndex])

  return (
    <StyledFlex>
      <Icon
        src={searchSvg}
        alt={searchSvg}
        style={{ position: 'relative', width: '18px', height: '18px', marginLeft: '8px', marginTop: '-2px' }}
      />
      <StyledInput
        ref={ref}
        id="search"
        value={buffer}
        autoComplete="off"
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          setWord(e.target.value)
          setBuffer(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault()
            if (matchingContents.length === 0) return
            setSelectedContentIndex((prev) => (prev === matchingContents.length - 1 ? 0 : prev + 1))
          } else if (e.key === 'Enter') {
            if (selectedContentIndex === -1) {
              alert('Select a relation. If you want to exit, press Escape of Ctrl+[')
              return
            }
            const startBlock = selectedBlocks[0]
            changeBlockStatus({
              blockId: startBlock.id,
              isEmpty: false,
              isSelected: false,
              editing: false,
            })
            const endBlock = BlockUtils.composeBlock(
              v4(),
              0,
              {
                row: startBlock.position.row + startBlock.height + 2,
                col: startBlock.position.col + startBlock.width + 2,
              },
              1,
              1,
              null,
              true,
              false,
              false
            )
            createBlock({ block: endBlock })
            createRelation({
              relation: {
                id: v4(),
                type: matchingContents[selectedContentIndex].key,
                startBlockId: startBlock.id,
                endBlockId: endBlock.id,
                isSelected: false,
                editing: true,
              },
            })
            toggleSidebar()
            changeMode('EDIT')
          } else {
            setSelectedContentIndex(-1)
          }
        }}
      />
    </StyledFlex>
  )
}

const StyledFlex = styled.div`
  position: relative;
  margin-left: 40px;
  width: 240px;
  height: 24px;
  display: flex;
  gap: 0 10px;
  background-color: #363c44;
  border-radius: 5px;
  z-index: 3;
`

const StyledInput = styled.input`
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: white;
  background-color: #363c44;
  resize: none;
  outline: none;
  border: none;
  width: 180px;
  height: 1em;
  margin-top: 4px;
`

export default React.memo(Search)
