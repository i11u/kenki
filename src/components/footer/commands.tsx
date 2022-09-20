import styled from 'styled-components'
import React from 'react'
import Command from './command'
import { CommandData } from './footer'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const Commands = ({
  buffer,
  selectedCommandIndex,
  matchingCommands,
}: {
  buffer: string
  selectedCommandIndex: number
  matchingCommands: CommandData[]
}) => {
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <StyledFlex style={{ backgroundColor: colorTheme.commands }}>
      <StyledCommandTitle
        style={{
          color: colorTheme.textPrimary,
          borderBottom: `0.5px solid ${colorTheme.border}`,
        }}
      >
        Commands
      </StyledCommandTitle>
      {matchingCommands.map((command, index) => (
        <Command
          key={`command-${command.name}`}
          buffer={buffer}
          command={command}
          isEven={index % 2 === 0}
          isSelected={index === selectedCommandIndex}
        />
      ))}
    </StyledFlex>
  )
}

const StyledFlex = styled.div`
  position: fixed;
  display: flex;
  top: calc(50% - 16.5px);
  width: 100%;
  height: 50%;
  flex-direction: column;
  z-index: 3;
`

const StyledCommandTitle = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  font-size: 90%;
  font-family: Monaco, sans-serif;
  padding-left: 16px;
`

export default React.memo(Commands)
