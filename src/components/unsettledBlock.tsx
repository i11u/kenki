import styled from 'styled-components'
import { CELL_LENGTH } from '../constants/pageSize'
import { UnsettledBlock, unsettledBlockSelectors } from '../states/unsettledBlock'

const StyledUnsettledBlock = styled.div`
  min-height: ${CELL_LENGTH - 1}px;
  min-width: ${CELL_LENGTH - 1}px;
  font-size: ${CELL_LENGTH - 1}px;
  text-align: center;
  outline: none;
  margin: -1px 0 0 -1px;
  border: 2px solid gray;
  opacity: 0.5;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  resize: none;
  z-index: 0;
  line-height: 1;
  white-space: nowrap;
`

type Props = {
  id: string
}

/**
 * UnsettledBlock (ub) is a empty content-editable block.
 * You move ub around by pressing arrow keys or clicking on cells.
 * If you start typing, texts will inflate in ub.
 * When you finish typing and get out of the ub,
 * the current state will be stored in blocks and then ub will be empty again.
 * */
function UnsettledBlockJSX({ id }: Props) {
  const unsettledBlock = unsettledBlockSelectors.useUnsettledBlockById(id) as UnsettledBlock

  /**
   * BlockがcontentEditableではなく、BlockはcontentEditableを持つ、という風にした方が使い勝手が良い可能性がある。
   * ひとまず前者で実装してみる。
   */

  const style = {
    top: `${unsettledBlock.block.position.row * CELL_LENGTH}px`,
    left: `${unsettledBlock.block.position.col * CELL_LENGTH}px`,
    width: `${unsettledBlock.block.width * (CELL_LENGTH - 1)}px`,
    height: `${unsettledBlock.block.height * (CELL_LENGTH - 1)}px`,
  }

  return <StyledUnsettledBlock id={`cursor-${id}`} style={style} contentEditable />
}

export default UnsettledBlockJSX
