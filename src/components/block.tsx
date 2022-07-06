import styled from 'styled-components'
import { useEffect } from 'react'
import { CELL_LENGTH } from '../constants/pageSize'
import { Block, blocksActions, blocksSelectors } from '../states/block'

const StyledBlockWrapper = styled.div<{ block: Block }>`
  top: ${(props) => props.block.position.row * CELL_LENGTH}px;
  left: ${(props) => props.block.position.col * CELL_LENGTH}px;
  width: ${(props) => CELL_LENGTH - 1 + (props.block.width - 1) * CELL_LENGTH}px;
  height: ${(props) => CELL_LENGTH - 1 + (props.block.height - 1) * CELL_LENGTH}px;
  min-height: ${CELL_LENGTH - 1}px;
  min-width: ${CELL_LENGTH - 1}px;
  margin: -1px 0 0 -1px;
  border: 2px solid gray;
  border-radius: 3px;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
`

const StyledBlock = styled.div`
  outline: none;
  white-space: nowrap;
  line-height: ${CELL_LENGTH}px;
  margin-top: -1px;
`

type Props = {
  id: string
}

function BlockJSX({ id }: { id: string }) {
  const block = blocksSelectors.useBlockById(id) as Block
  const changeBlockSize = blocksActions.useChangeBlockPosition()

  useEffect(() => {
    const blockdiv = document.getElementById(`block-${id}`) as HTMLDivElement
    setTimeout(() => blockdiv.focus(), 0)
  }, [id])

  return (
    <StyledBlockWrapper id={`block-${id}`} block={block}>
      <StyledBlock contentEditable />
    </StyledBlockWrapper>
  )
}

export default BlockJSX
