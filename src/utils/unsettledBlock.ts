import { unsettledBlockSelectors } from '../states/unsettledBlock'
import { blocksActions } from '../states/block'

export const handleOnCursorKeyDown = (id: string) => {
  const cursor = unsettledBlockSelectors.useUnsettledBlockById(id)
  const addBlock = blocksActions.useAddTextBlock()
}
