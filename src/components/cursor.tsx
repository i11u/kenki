import styled from 'styled-components'
import { Cursor, cursorsSelectors } from '../states/cursor'
import { CELL_LENGTH } from '../constants/pageSize'
import { CursorUtil } from '../utils/cursorUtil'
import { blocksActions } from '../states/block'

const StyledCursor = styled.div<{ cursor: Cursor }>`
  top: ${(props) => props.cursor.position.row * CELL_LENGTH}px;
  left: ${(props) => props.cursor.position.col * CELL_LENGTH}px;
  width: ${CELL_LENGTH - 1}px;
  height: ${CELL_LENGTH - 1}px;
  margin: -1px 0 0 -1px;
  border: 2px solid gray;
  border-radius: 3px;
  position: absolute;
  outline: none;
  text-align: center;
  display: none;
`

type Props = {
  userId: string
}

function CursorJSX({ userId }: Props) {
  const cursor = cursorsSelectors.useCursorById(userId) as Cursor
  const addBlock = blocksActions.useAddBlock()

  return (
    <StyledCursor
      contentEditable
      id={`cursor-${userId}`}
      cursor={cursor}
      onKeyDown={(e) => CursorUtil.handleOnKeyDown(e, userId, cursor.position, addBlock)}
    />
  )
}

export default CursorJSX
