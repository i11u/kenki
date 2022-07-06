import { cursorsSelectors } from '../states/cursor'
import CursorJSX from './cursor'

function CursorsJSX() {
  const cursors = cursorsSelectors.useCursors()

  return (
    <>
      {cursors.map((cursor) => (
        <CursorJSX key={cursor.userId} userId={cursor.userId} />
      ))}
    </>
  )
}

export default CursorsJSX
