import styled from 'styled-components'
import { match } from 'ts-pattern'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

const Mode = () => {
  const currentMode = modeSelectors.useCurrentMode()
  const { backgroundColor, color } = match(currentMode)
    .with('NORMAL', () => ({
      backgroundColor: '#efefef',
      color: 'black',
    }))
    .with('COMMAND', () => ({
      backgroundColor: '#000000',
      color: 'white',
    }))
    .with('EDIT', () => ({
      backgroundColor: '#6e964b',
      color: 'white',
    }))
    .with('SELECT', () => ({
      backgroundColor: '#326EA5',
      color: 'white',
    }))
    .with('MULTISELECT', () => ({
      backgroundColor: '#0D4E8A',
      color: 'white',
    }))
    .exhaustive()
  return <StyledFooter style={{ backgroundColor, color }}>-- {currentMode} --</StyledFooter>
}

const StyledFooter = styled.div`
  font-size: 80%;
  position: absolute;
  top: 98%;
  height: 2%;
  width: 100%;
  overflow: auto;
  display: flex;
  font-family: Monaco, serif;
`

export default Mode
