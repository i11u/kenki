import { useEffect } from 'react'
import { match } from 'ts-pattern'
import Header from './components/header/header'
import Sidebar from './components/sidebar/sidebar'
import Background from './components/editor/background'
import Page from './components/editor/page/page'
import Mode from './components/footer/mode'
import { modeSelectors } from './jotai-hooks/mode/selector'
import { modeActions } from './jotai-hooks/mode/action'
import { blockSelectors } from './jotai-hooks/blocks/selector'
import { blocksActions, useCreateBlock, useMoveBlock } from './jotai-hooks/blocks/action'
import EditorConfig from './components/editor/editorConfig/editorConfig'
import { useMoveCursor, useMoveCursorByPosition } from './jotai-hooks/cursor/action'
import { BlockUtils } from './utils/block'
import { cursorSelector } from './jotai-hooks/cursor/selector'

const App = () => {
  const editingBlockId = blockSelectors.useEditingBlockId()
  const editingBlock = blockSelectors.useEditingBlock()
  const mode = modeSelectors.useCurrentMode()
  const changeMode = modeActions.useSwitchModes()
  const moveCursor = useMoveCursor()
  const moveBlock = useMoveBlock()
  const createBlock = useCreateBlock()
  const cursorPosition = cursorSelector.useCursorPosition()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const moveCursorByPosition = useMoveCursorByPosition()

  const addEventListeners = () => console.log('a')

  const removeEventListeners = () => console.log('a')

  /*
   * Define functions when App component is mounted/unmounted.
   * */
  useEffect(() => {
    addEventListeners()
    return function cleanup() {
      removeEventListeners()
    }
  }, [])

  useEffect(() => {
    let buffer = ''
    const callback = (e: KeyboardEvent): void => {
      buffer += e.key
      return match(mode)
        .with('NORMAL', () =>
          match(buffer)
            .with(':', () => {
              e.preventDefault()
              changeMode('COMMAND')
            })
            .with('h', () => {
              moveCursor({ direction: 'left', offset: 1 })
              buffer = ''
            })
            .with('j', () => {
              moveCursor({ direction: 'down', offset: 1 })
              buffer = ''
            })
            .with('k', () => {
              moveCursor({ direction: 'up', offset: 1 })
              buffer = ''
            })
            .with('l', () => {
              moveCursor({ direction: 'right', offset: 1 })
              buffer = ''
            })
            .with('t', () => {
              if (e.ctrlKey) {
                changeMode('EDIT')
                createBlock(BlockUtils.emptyBlock({ position: cursorPosition }))
                buffer = ''
              }
            })
            .with('f', () => {
              if (e.shiftKey) {
                changeMode('MULTISELECT')
                buffer = ''
              }
              changeMode('SELECT')
              buffer = ''
            })
            .otherwise(() => {
              e.preventDefault()
              buffer = ''
            })
        )
        .with('COMMAND', () =>
          match(e.key)
            .with('Escape', () => {
              changeMode('NORMAL')
              buffer = ''
            })
            .otherwise(() => e.preventDefault())
        )
        .with('EDIT', () => {
          match(e.key)
            .with('Escape', () => {
              if (editingBlock) {
                changeBlockStatus({
                  blockId: editingBlockId as string,
                  isEmpty: editingBlock.isEmpty,
                  isSelected: false,
                  editing: false,
                })
                changeMode('NORMAL')
                moveCursorByPosition({
                  row: editingBlock.position.row + editingBlock.height - 1,
                  col: editingBlock.position.col + editingBlock.width - 1,
                })
                buffer = ''
              }
            })
            //  In EDIT mode, keystrokes are handled by listeners defined in each component.
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .otherwise(() => {})
        })
        .with('SELECT', () => {
          match(e.key)
            .with('Escape', () => {
              changeMode('NORMAL')
              buffer = ''
            })
            .with('i', () => {
              changeMode('EDIT')
              buffer = ''
            })
            //  editingBlockId is known to exist when entering SELECT mode.
            .with('h', () => {
              moveBlock({ blockId: editingBlockId as string, direction: 'left', offset: 1 })
              buffer = ''
            })
            .with('j', () => {
              moveBlock({ blockId: editingBlockId as string, direction: 'down', offset: 1 })
              buffer = ''
            })
            .with('k', () => {
              moveBlock({ blockId: editingBlockId as string, direction: 'up', offset: 1 })
              buffer = ''
            })
            .with('l', () => {
              moveBlock({ blockId: editingBlockId as string, direction: 'right', offset: 1 })
              buffer = ''
            })
            .otherwise(() => e.preventDefault())
        })
        .with('MULTISELECT', () =>
          match(e.key)
            .with('Escape', () => changeMode('NORMAL'))
            .with('v', () => changeMode('SELECT'))
            .otherwise(() => e.preventDefault())
        )
        .exhaustive()
    }
    document.addEventListener('keydown', callback)

    return function cleanup() {
      document.removeEventListener('keydown', callback)
    }
  }, [
    mode,
    changeMode,
    moveBlock,
    editingBlockId,
    moveCursor,
    createBlock,
    cursorPosition,
    changeBlockStatus,
    editingBlock,
    moveCursorByPosition,
  ])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <Input /> */}
      <Header />
      <Sidebar />
      <Background>
        <Page />
        <EditorConfig />
      </Background>
      <Mode />
    </div>
  )
}

export default App
