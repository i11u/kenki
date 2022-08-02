import styled from 'styled-components'
import HeaderJSX from './header'
import SidebarJSX from './sidebar'
import Background from './background'
import Page from './page'

const StyledInputValue = styled.div`
  width: 100px;
  height: 30px;
  color: white;
  font-family: Courier;
  background-color: black;
  border-radius: 3px;
  top: 10px;
  left: 50%;
  z-index: 1;
  text-align: center;
  vertical-align: center;
  padding-top: 10px;
  margin: 20px auto;
`

function Editor() {
  // const input = inputSelectors.useInputValue()

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <StyledInputValue>{input}</StyledInputValue> */}
      <HeaderJSX />
      <SidebarJSX />
      <Background>
        <Page />
      </Background>
    </div>
  )
}

export default Editor
