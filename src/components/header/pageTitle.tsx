import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { modeActions } from '../../jotai-hooks/mode/action'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const PageTitle = () => {
  const [title, setTitle] = useState('Untitled')
  const changeMode = modeActions.useSwitchModes()
  const colorTheme = colorThemeSelector.useColorTheme()
  const ref = useRef<HTMLInputElement>(null)

  return (
    <StyledTitle
      ref={ref}
      style={{
        // backgroundColor: colorTheme.header,
        backgroundColor: 'transparent',
        color: colorTheme.textPrimary,
      }}
      value={title}
      onFocus={(e) => {
        changeMode('EDIT')
      }}
      onChange={(e) => {
        setTitle(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          changeMode('CURSOR')
          ref.current?.blur()
        } else if (e.key === 'Enter') {
          changeMode('CURSOR')
          ref.current?.blur()
        }
      }}
    />
  )
}

const StyledTitle = styled.input`
  position: absolute;
  left: 50%;
  width: 400px;
  height: 100%;
  outline: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  text-align: center;
  transform-origin: center;
  transform: translateX(-50%);
  z-index: 2;
`

export default React.memo(PageTitle)
