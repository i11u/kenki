import styled from 'styled-components'
import { useEffect, useLayoutEffect, useState } from 'react'
import { cursorSelector } from '../../../jotai-hooks/cursor/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'
import { cursorAction } from '../../../jotai-hooks/cursor/action'
import { Position } from '../../../jotai-hooks/blocks/atom'

const StyledCursor = styled.div`
  position: absolute;
  border: 1px dashed darkgrey;
  background-color: darkgrey;
  opacity: 0.5;
  z-index: 3;
`

const CursorTSX = () => {
  const position = cursorSelector.useCursorPosition()
  const gridNum = pageConfigSelectors.useGridNum()
  const mode = modeSelectors.useCurrentMode()
  const [previousPosition, setPreviousPosition] = useState<Position>(position)
  const changeCursorPosition = cursorAction.useChangeCursorPosition()

  /*
   * Update previousPosition
   * */
  useEffect(() => setPreviousPosition(position), [position])

  useLayoutEffect(() => {
    if (position.col < 0 || position.col >= gridNum.colNum || position.row < 0 || position.row >= gridNum.rowNum) {
      window.alert('position is out of range')
      changeCursorPosition(previousPosition)
    }
  }, [changeCursorPosition, gridNum.colNum, gridNum.rowNum, position.col, position.row, previousPosition])

  const style = {
    top: `${position.row * (100 / gridNum.rowNum)}%`,
    left: `${position.col * (100 / gridNum.colNum)}%`,
    minWidth: `calc(${100 / gridNum.colNum}% - 1px)`,
    minHeight: `calc(${100 / gridNum.rowNum}% - 1px)`,
  }

  return mode === 'EDIT' || mode === 'SELECT' || mode === 'INSERT' ? null : <StyledCursor id="cursor" style={style} />
}

export default CursorTSX
