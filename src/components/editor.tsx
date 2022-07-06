import Page from './page'
import BlocksJSX from './blocks'
import CellsJSX from './cells'

function Editor() {
  return (
    <Page>
      {/* <CursorsJSX /> */}
      <BlocksJSX />
      <CellsJSX />
    </Page>
  )
}

export default Editor
