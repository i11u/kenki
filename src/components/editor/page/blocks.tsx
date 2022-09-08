import React, { memo } from 'react'
import BlockTSX from './block'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'

const Blocks = memo(() => {
  const blocks = blockSelectors.useBlockAtoms()

  return (
    <div>
      {blocks.map((blockAtom, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <BlockTSX key={`block-${index}`} blockAtom={blockAtom} />
      ))}
    </div>
  )
})

export default Blocks
