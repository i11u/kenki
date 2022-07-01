import styled from 'styled-components'
import { CELL_LENGTH } from '../constants/pageSize'

const StyledBlock = styled.div`
  // width: ${CELL_LENGTH}px;
  // height: ${CELL_LENGTH}px;
  outline: none;
  margin: -1px 0 0 -1px;
  position: absolute;
  z-index: 1;
`

const StyledFocusedBlock = styled.div`
  // width: ${CELL_LENGTH}px;
  // height: ${CELL_LENGTH}px;
  outline: none;
  margin: -1px 0 0 -1px;
  border: 2px dotted blue;
  opacity: 0.2;
  background-color: cornflowerblue;
  border-radius: 3px;
  position: absolute;
  z-index: 1;
`

function BlockJSX() {
  return <StyledBlock contentEditable />
}

export default BlockJSX
