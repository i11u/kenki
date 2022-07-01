import { blocksSelectors } from '../states/block'
import BlockJSX from './block'

function BlocksJSX() {
  const blocks = blocksSelectors.useBlocks()

  return (
    <>
      {blocks.map((block) => (
        <BlockJSX key={block.id} />
      ))}
    </>
  )
}

export default BlocksJSX
