import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { match } from 'ts-pattern'
import { useAtomValue } from 'jotai'
import Commands from './commands'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { modeActions } from '../../jotai-hooks/mode/action'
import { colorThemeActions } from '../../jotai-hooks/colorTheme/action'
import { useRemoveAllBlocks } from '../../jotai-hooks/blocks/action'
import { useRemoveAllRelations } from '../../jotai-hooks/relations/action'
import { editorConfigActions } from '../../jotai-hooks/editorConfig/action'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import { pageConfigActions } from '../../jotai-hooks/pageConfig/action'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import { blocksAtom } from '../../jotai-hooks/blocks/atom'
import { relationsAtom } from '../../jotai-hooks/relations/atom'

export type CommandData = {
  name: string
  description: string
  shortcut: string
}

export const commands: CommandData[] = [
  {
    name: 'save-page',
    description: 'save current page',
    shortcut: '⌘+s',
  },
  {
    name: 'discard-page',
    description: 'discard the current blocks/relations',
    shortcut: '⌘+Back',
  },
  {
    name: 'settings',
    description: 'open/close settings',
    shortcut: '⌘+,',
  },
  {
    name: 'help',
    description: 'show help',
    shortcut: '⌘+.',
  },
  // {
  //   name: 'hint',
  //   description: 'show hint',
  //   shortcut: 'f',
  // },
  {
    name: 'switch-color-theme',
    description: 'switch between light/dark theme',
    shortcut: '⌘+L',
  },
  {
    name: 'edit-title',
    description: 'edit the title',
    shortcut: '⌘+T',
  },
  {
    name: 'aspect-ratio',
    description: 'flip the aspect ratio of the page (document/slide)',
    shortcut: '⌘+A',
  },
]

const Footer = () => {
  const colorTheme = colorThemeSelector.useColorTheme()
  const mode = modeSelectors.useCurrentMode()
  const { backgroundColor, color } = match(mode)
    .with('NORMAL', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('INSERT', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('COMMAND', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('EDIT', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('SELECT', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('MULTISELECT', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('BLOCKHINT', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('SETTINGS', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
    }))
    .with('HELP', () => ({
      backgroundColor: colorTheme.footer,
      color: colorTheme.textPrimary,
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
  const changeMode = modeActions.useSwitchModes()
  const toggleColorTheme = colorThemeActions.useToggleColorTheme()
  const removeBlocks = useRemoveAllBlocks()
  const removeRelations = useRemoveAllRelations()
  const toggleSidebarRight = editorConfigActions.useToggleSidebarRight()
  const blocks = useAtomValue(blocksAtom)
  const relations = useAtomValue(relationsAtom)

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

  const separationIsVisible = editorConfigSelectors.useSeparationIsVisible()
  const aspectRatio = pageConfigSelectors.useAspectRatio()
  const changeAspectRatio = pageConfigActions.useChangeAspectRatio()
  const toggleEditingTitle = pageConfigActions.useToggleEditingTitle()

  return (
    <>
      {mode === 'COMMAND' ? (
        <Commands buffer={buffer} selectedCommandIndex={selectedCommandIndex} matchingCommands={matchingCommands} />
      ) : null}
      <StyledFlex
        style={{
          backgroundColor,
          color,
          borderTop: `0.5px solid ${separationIsVisible ? colorTheme.border : 'transparent'}`,
        }}
      >
        <StyledText> -- {mode} --</StyledText>
        {mode === 'COMMAND' ? (
          <StyledInput
            ref={ref}
            value={word}
            autoComplete="off"
            style={{ backgroundColor: colorTheme.footer, color: colorTheme.textPrimary }}
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
                  // commands[sellectedCommandIndex]それぞれの処理を行う
                  match(matchingCommands[selectedCommandIndex].name)
                    .with('save-page', () => {
                      const json = JSON.stringify({ blocks, relations })
                      const copyToClipboard = async () => navigator.clipboard.writeText(json)
                      copyToClipboard()
                        .then((r) => window.alert('Copied current page to clipboard in json format.'))
                        .catch((error) => window.alert('Failed to copy current page to clipboard.'))
                      changeMode('NORMAL')
                    })
                    .with('discard-page', () => {
                      if (window.confirm('Do you want to clear the current contents?')) {
                        removeBlocks()
                        removeRelations()
                      }
                      changeMode('NORMAL')
                    })
                    .with('settings', () => {
                      changeMode('SETTINGS')
                      toggleSidebarRight()
                    })
                    .with('help', () => {
                      changeMode('HELP')
                      toggleSidebarRight()
                    })
                    // .with('hint', () => {
                    //   console.log('aaa')
                    // })
                    .with('switch-color-theme', () => {
                      toggleColorTheme()
                    })
                    .with('edit-title', () => {
                      changeMode('NORMAL')
                      toggleEditingTitle()
                    })
                    .with('aspect-ratio', () => {
                      changeAspectRatio(aspectRatio === 'document' ? 'slide' : 'document')
                    })
                    .otherwise(() => undefined)
                } else {
                  match(word)
                    .with('save-page', () => {
                      const json = JSON.stringify({ blocks, relations })
                      const copyToClipboard = async () => navigator.clipboard.writeText(json)
                      copyToClipboard()
                        .then((r) => window.alert('Copied current page to clipboard in json format.'))
                        .catch((error) => window.alert('Failed to copy current page to clipboard.'))
                      changeMode('NORMAL')
                    })
                    .with('discard-page', () => {
                      if (window.confirm('Do you want to clear the current contents?')) {
                        removeBlocks()
                        removeRelations()
                      }
                      changeMode('NORMAL')
                    })
                    .with('settings', () => {
                      changeMode('SETTINGS')
                      toggleSidebarRight()
                    })
                    .with('help', () => {
                      changeMode('HELP')
                      toggleSidebarRight()
                    })
                    // .with('hint', () => {
                    //   console.log('aaa')
                    // })
                    .with('switch-color-theme', () => {
                      toggleColorTheme()
                    })
                    .with('edit-title', () => {
                      changeMode('NORMAL')
                      toggleEditingTitle()
                    })
                    .with('aspect-ratio', () => {
                      changeAspectRatio(aspectRatio === 'document' ? 'slide' : 'document')
                      changeMode('NORMAL')
                    })
                    .otherwise(() => window.alert(`${word}: no such command`))
                }
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
  position: fixed;
  bottom: 0;
  height: 16px;
  width: 100%;
  display: flex;
  gap: 0 20px;
  z-index: 3;
`

const StyledText = styled.div`
  font-size: 80%;
  font-family: Monaco, sans-serif;
`

const StyledInput = styled.input`
  font-family: Monaco, sans-serif;
  outline: none;
  border: none;
  width: 50%;
  height: 14px;
  flex-grow: 1;
`

export default React.memo(Footer)
