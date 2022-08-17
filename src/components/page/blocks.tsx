import React from 'react'
import BlockTSX from './block'
import { blockSelectors } from '../../recoil-hooks/blocks/selector'

function Blocks() {
  const blocks = blockSelectors.useBlocks()

  return (
    <>
      {blocks.map((block) => (
        <BlockTSX id={block.id} key={block.id} />
      ))}
    </>
  )
}

export default Blocks
