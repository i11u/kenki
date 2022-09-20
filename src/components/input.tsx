import styled from 'styled-components'
import { inputSelectors } from '../jotai-hooks/input'
import { colorThemeSelector } from '../jotai-hooks/colorTheme/selector'

const Input = () => {
  const input = inputSelectors.useInputValue()
  const colorTheme = colorThemeSelector.useColorTheme()
  return <StyledInputValue style={{ color: colorTheme.textPrimary }}>{input}</StyledInputValue>
}

const StyledInputValue = styled.div`
  width: 150px;
  height: 30px;
  font-family: Courier;
  background-color: black;
  border-radius: 3px;
  bottom: 30px;
  right: 50px;
  z-index: 1;
  position: fixed;
  text-align: center;
  vertical-align: center;
  padding-top: 8px;
  font-size: 20px;
`

export default Input
