import React from 'react'
import { splitAtom } from 'jotai/utils'
import { useAtomValue } from 'jotai'
import BlockTSX from './block'
import { blocksAtom } from '../../../jotai-hooks/blocks/atom'

const Blocks = () => {
  const blocks = useAtomValue(splitAtom(blocksAtom))

  return (
    <div>
      {blocks.map((blockAtom, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <BlockTSX key={`block-${index}`} blockAtom={blockAtom} />
      ))}
    </div>
  )
}

export default React.memo(Blocks)
