import styled from 'styled-components'
import { match } from 'ts-pattern'
import { modeSelectors } from '../../jotai-hooks/mode/selector'

const Mode = () => {
  const currentMode = modeSelectors.useCurrentMode()
  const { backgroundColor, color } = match(currentMode)
    .with('NORMAL', () => ({
      backgroundColor: '#edecea',
      color: 'black',
    }))
    .with('COMMAND', () => ({
      backgroundColor: '#edecea',
      color: 'black',
    }))
    .with('EDIT', () => ({
      backgroundColor: '#edecea',
      color: 'black',
    }))
    .with('SELECT', () => ({
      backgroundColor: '#edecea',
      color: 'black',
    }))
    .with('MULTISELECT', () => ({
      backgroundColor: '#edecea',
      color: 'black',
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
  border-top: 1px solid #a9a9a9;
  margin-top: -3px;
`

export default Mode
