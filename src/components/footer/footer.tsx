import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { match } from 'ts-pattern'
import Commands from './commands'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

export type CommandData = {
  name: string
  description: string
  shortcut: string
}

export const commands: CommandData[] = [
  {
    name: 'help',
    description: 'show help',
    shortcut: 'Command + Shift + h',
  },
  {
    name: 'hint',
    description: 'show hint',
    shortcut: 'f',
  },
  {
    name: 'save',
    description: 'save current canvas',
    shortcut: 'Command + s',
  },
]

const Footer = () => {
  const mode = modeSelectors.useCurrentMode()
  const { backgroundColor, color } = match(mode)
    .with('NORMAL', () => ({
      backgroundColor: '#25292e',
      color: 'white',
    }))
    .with('INSERT', () => ({
      backgroundColor: '#25292e',
      color: 'white',
    }))
    .with('COMMAND', () => ({
      backgroundColor: '#25292e',
      color: 'white',
    }))
    .with('EDIT', () => ({
      backgroundColor: '#25292e',
      color: 'white',
    }))
    .with('SELECT', () => ({
      backgroundColor: '#25292e',
      color: 'white',
    }))
    .with('MULTISELECT', () => ({
      backgroundColor: '#25292e',
      color: 'white',
    }))
    .with('BLOCKHINT', () => ({
      backgroundColor: '#25292e',
      color: 'white',
    }))
    .exhaustive()

  const [word, setWord] = useState('Enter command')
  const [buffer, setBuffer] = useState('')
  const [selectedCommandIndex, setSelectedCommandIndex] = useState<number>(-1)
  const ref = useRef<HTMLInputElement>(null)
  const matchingCommands =
    buffer === 'Enter command' || ''
      ? commands
      : commands.filter((command) => command.name.match(buffer) || command.description.match(buffer))

  useEffect(() => {
    if (mode === 'COMMAND') {
      setTimeout(() => ref.current?.focus(), 0)
    } else {
      setTimeout(() => ref.current?.blur(), 0)
    }
    return function cleanup() {
      setWord('Enter command')
      setBuffer('Enter command')
    }
  }, [mode, setWord])

  useEffect(() => {
    if (selectedCommandIndex === -1) {
      setWord(buffer)
    } else {
      setWord(matchingCommands[selectedCommandIndex].name)
    }
  }, [buffer, matchingCommands, selectedCommandIndex])

  return (
    <>
      {mode === 'COMMAND' ? (
        <Commands buffer={buffer} selectedCommandIndex={selectedCommandIndex} matchingCommands={matchingCommands} />
      ) : null}
      <StyledFlex style={{ backgroundColor, color }}>
        <StyledText> -- {mode} --</StyledText>
        {mode === 'COMMAND' ? (
          <StyledInput
            ref={ref}
            value={word}
            autoComplete="off"
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              setWord(e.target.value)
              setBuffer(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault()
                if (matchingCommands.length === 0) return
                setSelectedCommandIndex((prev) => (prev === matchingCommands.length - 1 ? 0 : prev + 1))
              } else if (e.key === 'Enter') {
                if (selectedCommandIndex !== -1) {
                  setSelectedCommandIndex(-1)
                }
                setWord('')
                setBuffer('')
              } else {
                setSelectedCommandIndex(-1)
              }
            }}
          />
        ) : null}
      </StyledFlex>
    </>
  )
}

const StyledFlex = styled.div`
  position: absolute;
  top: 97.5%;
  height: 2.5%;
  width: 100%;
  border-top: 2px solid #363c44;
  display: flex;
  gap: 0 20px;
`

const StyledText = styled.div`
  font-size: 90%;
  font-family: Monaco, sans-serif;
`

const StyledInput = styled.input`
  background-color: #25292e;
  font-family: Monaco, sans-serif;
  color: white;
  outline: none;
  border: none;
  width: 50%;
  height: fit-content;
  flex-grow: 1;
`

export default React.memo(Footer)
