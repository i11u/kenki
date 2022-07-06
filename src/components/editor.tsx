import Page from './page'
import BlocksJSX from './blocks'
import CellsJSX from './cells'
import UnsettledBlockJSX from './unsettledBlock'

function Editor() {
  return (
    <Page>
      {/* <CursorsJSX /> */}
      <UnsettledBlockJSX userId="user1" />
      <BlocksJSX />
      <CellsJSX />
    </Page>
  )
}

export default Editor
