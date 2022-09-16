import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import usePreventPinch from '../../hooks/usePreventPinch'
import useIsFirst from '../../hooks/useIsFirst'
import useOnResizeEffect from '../../hooks/useOnResizeEffect'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import Contents from './contents'
import Title from './title'
import Search from './search'
import { RelationType } from '../../jotai-hooks/relations/atom'

export type ContentData = {
  key: RelationType
  description: string
}

export const contents: ContentData[] = [
  {
    key: 'normal-arrow-outward',
    description: 'outward arrow with a label placeholder',
  },
  {
    key: 'normal-arrow-inward',
    description: 'inward arrow with a label placeholder',
  },
  {
    key: 'thick-arrow-outward',
    description: 'thick outward arrow with a label placeholder',
  },
]

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  usePreventPinch(sidebarRef)
  const gridNum = pageConfigSelectors.useGridNum()
  useOnResizeEffect(gridNum.rowNum, sidebarRef)

  // Sidebar Animation
  const sidebarIsOpen = editorConfigSelectors.useSidebarIsOpen()
  const style = useIsFirst()
    ? { width: '0' }
    : { animationName: sidebarIsOpen === undefined ? '' : sidebarIsOpen ? 'animate-sidebar-1' : 'animate-sidebar-2' }

  // Search relations
  const mode = modeSelectors.useCurrentMode()
  const [word, setWord] = useState('Enter keyword')
  const [buffer, setBuffer] = useState('')
  const [selectedContentIndex, setSelectedContentIndex] = useState<number>(-1)
  const matchingContents =
    buffer === 'Enter keyword' || '' ? contents : contents.filter((command) => command.description.match(buffer))

  useEffect(() => {
    if (selectedContentIndex === -1) {
      setWord(buffer)
    } else {
      setWord(matchingContents[selectedContentIndex].key)
    }
  }, [buffer, matchingContents, selectedContentIndex, setSelectedContentIndex])

  return (
    <StyledSidebar id="sidebar" ref={sidebarRef} style={style}>
      {mode === 'INSERT' ? (
        <StyledFlex>
          <Title />
          <Search
            word={word}
            setWord={setWord}
            buffer={buffer}
            setBuffer={setBuffer}
            selectedContentIndex={selectedContentIndex}
            setSelectedContentIndex={setSelectedContentIndex}
            matchingContents={matchingContents}
          />
          <Contents buffer={buffer} selectedContentIndex={selectedContentIndex} matchingContents={matchingContents} />
        </StyledFlex>
      ) : null}
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  top: 5%;
  height: 95%;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  background-color: #25292e;
  position: fixed;
  border-right: 2px solid #363c44;
  box-sizing: border-box;
  z-index: 0;
`

const StyledFlex = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
`

export default React.memo(Sidebar)
