import styled from 'styled-components'
import Page from './page'
import BlocksJSX from './blocks'
import CellsJSX from './cells'

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
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  vertical-align: center;
  padding-top: 10px;
  margin-right: auto;
  margin-left: auto;
`

function Editor() {
  // const input = inputSelectors.useInputValue()

  return (
    <div>
      {/* <StyledInputValue>{input}</StyledInputValue> */}
      <Page>
        <BlocksJSX />
        <CellsJSX />
      </Page>
    </div>
  )
}

export default Editor
