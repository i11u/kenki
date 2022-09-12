import styled from 'styled-components'
import React, { useEffect, useRef } from 'react'
import Icon from '../common/icon'
import searchSvg from '../../assets/icons/search.svg'
import { ContentData } from './sidebar'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

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
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mode === 'INSERT') {
      setTimeout(() => ref.current?.focus(), 0)
    } else {
      setTimeout(() => ref.current?.blur(), 0)
    }
    return function cleanup() {
      setWord('Enter keyword')
      setBuffer('Enter keyword')
    }
  }, [mode, setBuffer, setWord])

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
            if (selectedContentIndex !== -1) {
              setSelectedContentIndex(-1)
            }
            setWord('')
            setBuffer('')
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
