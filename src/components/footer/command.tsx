import React from 'react'
import styled from 'styled-components'
import { CommandData } from './footer'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const Command = ({
  buffer,
  command,
  isEven,
  isSelected,
}: {
  buffer: string
  command: CommandData
  isEven: boolean
  isSelected: boolean
}) => {
  const { name, description, shortcut } = command
  const colorTheme = colorThemeSelector.useColorTheme()
  const nameArr = name.split(buffer)
  const descArr = description.split(buffer)

  return (
    <StyledFlex
      style={{ backgroundColor: isSelected ? 'yellow' : isEven ? colorTheme.commandEven : colorTheme.commandOdd }}
    >
      <StyledText style={{ width: '18%', marginLeft: '2%' }}>
        {nameArr.map((str, index) => {
          if (index === nameArr.length - 1) {
            return <span style={{ color: isSelected ? 'black' : colorTheme.textPrimary }}>{str}</span>
          }
          return (
            <span>
              <span style={{ color: isSelected ? 'black' : colorTheme.textPrimary }}>{str}</span>
              <span style={{ color: 'red' }}>{buffer}</span>
            </span>
          )
        })}
      </StyledText>
      <StyledText style={{ width: '55%' }}>
        {descArr.map((str, index) => {
          if (index === descArr.length - 1) {
            return <span style={{ color: isSelected ? 'black' : colorTheme.textPrimary }}>{str}</span>
          }
          return (
            <span>
              <span style={{ color: isSelected ? 'black' : colorTheme.textPrimary }}>{str}</span>
              <span style={{ color: 'red' }}>{buffer}</span>
            </span>
          )
        })}
      </StyledText>
      <StyledText style={{ width: '25%', color: isSelected ? 'black' : colorTheme.textPrimary }}>{shortcut}</StyledText>
    </StyledFlex>
  )
}

const StyledFlex = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;
  justify-content: space-between;
`

const StyledText = styled.div`
  position: relative;
  font-family: Monaco, sans-serif;
  font-size: 80%;
  align-self: flex-start;
`

export default React.memo(Command)
