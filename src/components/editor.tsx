import Page from './page'
import UnsettledBlockJSX from './unsettledBlock'
import BlocksJSX from './blocks'
import { getInitialCells } from '../utils/cellUtil'
import { Position } from '../types/position'
import CellsJSX from './cells'
import { getUserId } from '../utils/authUtil'

function Editor() {
  const grid: Position[][] = getInitialCells()

  return (
    <Page>
      <UnsettledBlockJSX id={getUserId()} />
      <BlocksJSX />
      <CellsJSX />
    </Page>
  )
}

export default Editor
