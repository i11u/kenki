import styled from 'styled-components'
import { cursorSelector } from '../../../jotai-hooks/cursor/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'

const StyledCursor = styled.div`
  position: absolute;
  border: 1px solid darkgrey;
  background-color: darkgrey;
  opacity: 0.3;
  z-index: 3;
`

const CursorTSX = () => {
  const position = cursorSelector.useCursorPosition()
  const gridNum = pageConfigSelectors.useGridNum()
  const mode = modeSelectors.useCurrentMode()

  const style = {
    top: `${position.row * (100 / gridNum.rowNum)}%`,
    left: `${position.col * (100 / gridNum.colNum)}%`,
    minWidth: `calc(${100 / gridNum.colNum}% - 1px)`,
    minHeight: `calc(${100 / gridNum.rowNum}% - 1px)`,
  }

  return mode === 'EDIT' || mode === 'SELECT' ? null : <StyledCursor style={style} />
}

export default CursorTSX
