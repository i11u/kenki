import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import { v4 } from 'uuid'
import searchSvg from '../../assets/icons/search.svg'
import { ContentData } from './sidebarLeft'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import { modeActions } from '../../jotai-hooks/mode/action'
import { relationActions } from '../../jotai-hooks/relations/action'
import { editorConfigActions } from '../../jotai-hooks/editorConfig/action'
import { blockSelectors } from '../../jotai-hooks/blocks/selector'
import { blocksActions } from '../../jotai-hooks/blocks/action'
import { BlockUtils } from '../../utils/block'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'

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
  const toggleSidebar = editorConfigActions.useToggleSidebarLeft()
  const ref = useRef<HTMLInputElement>(null)
  const selectedBlocks = blockSelectors.useSelectedBlocks()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const createBlock = blocksActions.useAddBlock()
  const colorTheme = colorThemeSelector.useColorTheme()
  const toggleSidebarLeft = editorConfigActions.useToggleSidebarLeft()
  const scale = pageConfigSelectors.usePageScale()

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
    <StyledFlex style={{ backgroundColor: colorTheme.searchBox }}>
      <svg
        style={{
          position: 'relative',
          color: colorTheme.icon,
          width: '16px',
          height: '16px',
          marginLeft: '8px',
          transform: 'translateY(20%)',
        }}
      >
        <use xlinkHref={`${searchSvg}#search`} />
      </svg>
      <StyledInput
        ref={ref}
        id="search"
        value={buffer}
        autoComplete="off"
        style={{ backgroundColor: colorTheme.searchBox, color: colorTheme.textPrimary }}
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
          } else if (e.key === 'Escape') {
            changeMode('SELECT')
            toggleSidebarLeft()
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
              false,
              ''
            )
            createBlock({ block: endBlock })
            createRelation({
              relation: {
                id: v4(),
                orient: matchingContents[selectedContentIndex].orient,
                type: matchingContents[selectedContentIndex].type,
                startBlockId: startBlock.id,
                endBlockId: endBlock.id,
                isSelected: true,
                editing: true,
                label: '',
                scale,
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
  margin-left: 30px;
  width: 220px;
  height: 20px;
  display: flex;
  gap: 0 10px;
  border-radius: 5px;
`

const StyledInput = styled.input`
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  resize: none;
  outline: none;
  border: none;
  width: 180px;
  height: 1em;
  margin-top: 3px;
`

export default React.memo(Search)
