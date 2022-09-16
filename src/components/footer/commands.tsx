import styled from 'styled-components'
import React from 'react'
import Command from './command'
import { CommandData } from './footer'

const Commands = ({
  buffer,
  selectedCommandIndex,
  matchingCommands,
}: {
  buffer: string
  selectedCommandIndex: number
  matchingCommands: CommandData[]
}) => (
  <StyledFlex>
    <StyledCommandTitle>Commands</StyledCommandTitle>
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

const StyledFlex = styled.div`
  position: fixed;
  display: flex;
  top: 47.5%;
  width: 100%;
  height: 50%;
  background-color: #25292e;
  flex-direction: column;
`

const StyledCommandTitle = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  color: white;
  font-size: 90%;
  font-family: Monaco, sans-serif;
  padding-left: 16px;
  border-bottom: 2px solid #363c44;
`

export default React.memo(Commands)
