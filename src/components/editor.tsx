import styled from 'styled-components'
import HeaderJSX from './header'
import SidebarJSX from './sidebar'
import Background from './background'
import Page from './page'
import { inputSelectors } from '../states/input'

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

function Editor() {
  const input = inputSelectors.useInputValue()

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <StyledInputValue>{input}</StyledInputValue>
      <HeaderJSX />
      <SidebarJSX />
      <Background>
        <Page />
      </Background>
    </div>
  )
}

export default Editor
