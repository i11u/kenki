import React, { memo } from 'react'
import BlockTSX from './block'
import { blockSelectors } from '../../recoil-hooks/blocks/selector'

const Blocks = memo(() => {
  const blocks = blockSelectors.useBlockAtoms()

  return (
    <div>
      {blocks.map((blockAtom, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <BlockTSX key={`block-${i}`} blockAtom={blockAtom} />
      ))}
    </div>
  )
})

export default Blocks
