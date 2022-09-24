import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { modeActions } from '../../jotai-hooks/mode/action'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import { pageConfigActions } from '../../jotai-hooks/pageConfig/action'

const PageTitle = () => {
  const [title, setTitle] = useState('Untitled')
  const changeMode = modeActions.useSwitchModes()
  const colorTheme = colorThemeSelector.useColorTheme()
  const ref = useRef<HTMLInputElement>(null)
  const editingTitle = pageConfigSelectors.useEditingTitle()
  const toggleEditingTitle = pageConfigActions.useToggleEditingTitle()

  useEffect(() => {
    if (editingTitle) {
      ref.current?.focus()
    } else {
      ref.current?.blur()
    }
  }, [editingTitle])

  return (
    <StyledTitle
      ref={ref}
      style={{
        // backgroundColor: colorTheme.header,
        backgroundColor: 'transparent',
        color: colorTheme.textSecondary,
      }}
      value={title}
      onFocus={(e) => {
        if (!editingTitle) toggleEditingTitle()
      }}
      onChange={(e) => {
        setTitle(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          toggleEditingTitle()
          ref.current?.blur()
        } else if (e.key === 'Enter') {
          toggleEditingTitle()
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
