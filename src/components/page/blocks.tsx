import React, { memo } from 'react'
import BlockTSX from './block'
import { blockSelectors } from '../../recoil-hooks/blocks/selector'

const Blocks = memo(() => {
  const blocks = blockSelectors.useBlocks()

  return (
    <div>
      {blocks.map((block) => (
        <BlockTSX key={block.id} id={block.id} />
      ))}
    </div>
  )
})

export default Blocks
