import styled from 'styled-components'
import { inputSelectors } from '../jotai-hooks/input'

const Input = () => {
  const input = inputSelectors.useInputValue()
  return <StyledInputValue>{input}</StyledInputValue>
}

const StyledInputValue = styled.div`
  width: 150px;
  height: 30px;
  color: white;
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
