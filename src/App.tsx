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
import { blocksActions, Direction, useCreateBlock, useMoveBlock } from './jotai-hooks/blocks/action'
import EditorConfig from './components/editor/editorConfig/editorConfig'
import { useMoveCursor, useMoveCursorByPosition } from './jotai-hooks/cursor/action'
import { BlockUtils } from './utils/block'
import { cursorSelector } from './jotai-hooks/cursor/selector'
import { DomUtils } from './utils/dom'
import { pageConfigSelectors } from './jotai-hooks/pageConfig/selector'

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
  const gridNum = pageConfigSelectors.useGridNum()

  const addEventListeners = () => console.log('')

  const removeEventListeners = () => console.log('')

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
      console.log(buffer)
      return (
        match(mode)
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
                changeMode('BLOCKHINT')
                //  Activate block hints
                const blockDOMs = Array.from(document.getElementsByClassName('block'))
                const hints = blockDOMs.map((blockDOM) => {
                  const hint = document.createElement('div')
                  const rawLabel = document.createElement('span')
                  rawLabel.innerText = blockDOM.id
                  hint.appendChild(rawLabel)
                  hint.style.zIndex = '10'
                  return hint
                })
                const hintContainerDiv = DomUtils.addElementList(
                  hints,
                  document.getElementById('page') as HTMLElement,
                  {
                    id: 'hintContainer',
                    className: '',
                  }
                )
                buffer = ''
              })
              .otherwise(() => {
                if (document.getElementById('shadowContainer')) {
                  DomUtils.removeElement(document.getElementById('shadowContainer') as HTMLDivElement)
                }
                if (/^\d+$/.test(buffer)) {
                  const cursorDOM = document.getElementById('cursor') as HTMLDivElement
                  const offset = Number(buffer)
                  const cellWidth = 100 / gridNum.colNum
                  const cellHeight = 100 / gridNum.rowNum
                  const directions: Direction[] = ['left', 'down', 'up', 'right']
                  const shadows = directions.map((direction) => {
                    const shadow = cursorDOM.cloneNode(true) as HTMLDivElement
                    shadow.id = ''
                    shadow.style.position = 'absolute'
                    shadow.style.opacity = '0.2'
                    match(direction)
                      .with('left', () => {
                        shadow.style.left = `${cellWidth * (cursorPosition.col - offset)}%`
                      })
                      .with('down', () => {
                        shadow.style.top = `${cellHeight * (cursorPosition.row + offset)}%`
                      })
                      .with('up', () => {
                        shadow.style.top = `${cellHeight * (cursorPosition.row - offset)}%`
                      })
                      .with('right', () => {
                        shadow.style.left = `${cellWidth * (cursorPosition.col + offset)}%`
                      })
                      .exhaustive()
                    return shadow
                  })
                  const shadowContainerDiv = DomUtils.addElementList(
                    shadows,
                    document.getElementById('page') as HTMLElement,
                    {
                      id: 'shadowContainer',
                      className: '',
                    }
                  )
                } else if (/^\d+h$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'left', offset })
                  buffer = ''
                } else if (/^\d+j$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'down', offset })
                  buffer = ''
                } else if (/^\d+k$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'up', offset })
                  buffer = ''
                } else if (/^\d+l$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'right', offset })
                  buffer = ''
                } else {
                  e.preventDefault()
                  buffer = ''
                }
              })
          )
          .with('COMMAND', () =>
            match(buffer)
              .with('Escape', () => {
                changeMode('NORMAL')
                buffer = ''
              })
              .otherwise(() => e.preventDefault())
          )
          .with('EDIT', () => {
            match(buffer)
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
              .otherwise(() => {
                buffer = ''
              })
          })
          .with('SELECT', () => {
            match(buffer)
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
              .otherwise(() => {
                if (document.getElementById('shadowContainer')) {
                  DomUtils.removeElement(document.getElementById('shadowContainer') as HTMLDivElement)
                }
                if (/^\d+$/.test(buffer)) {
                  const cursorDOM = document.getElementById('cursor') as HTMLDivElement
                  const offset = Number(buffer)
                  const cellWidth = 100 / gridNum.colNum
                  const cellHeight = 100 / gridNum.rowNum
                  const directions: Direction[] = ['left', 'down', 'up', 'right']
                  const shadows = directions.map((direction) => {
                    const shadow = cursorDOM.cloneNode(true) as HTMLDivElement
                    shadow.id = ''
                    shadow.style.position = 'absolute'
                    shadow.style.opacity = '0.2'
                    match(direction)
                      .with('left', () => {
                        shadow.style.left = `${cellWidth * (cursorPosition.col - offset)}%`
                      })
                      .with('down', () => {
                        shadow.style.top = `${cellHeight * (cursorPosition.row + offset)}%`
                      })
                      .with('up', () => {
                        shadow.style.top = `${cellHeight * (cursorPosition.row - offset)}%`
                      })
                      .with('right', () => {
                        shadow.style.left = `${cellWidth * (cursorPosition.col + offset)}%`
                      })
                      .exhaustive()
                    return shadow
                  })
                  const shadowContainerDiv = DomUtils.addElementList(
                    shadows,
                    document.getElementById('page') as HTMLElement,
                    {
                      id: 'shadowContainer',
                      className: '',
                    }
                  )
                } else if (/^\d+h$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'left', offset })
                  buffer = ''
                } else if (/^\d+j$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'down', offset })
                  buffer = ''
                } else if (/^\d+k$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'up', offset })
                  buffer = ''
                } else if (/^\d+l$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveCursor({ direction: 'right', offset })
                  buffer = ''
                } else {
                  e.preventDefault()
                  buffer = ''
                }
              })
          })
          //  MULTISELECT mode is disabled for now
          .with('MULTISELECT', () =>
            match(buffer)
              .with('Escape', () => changeMode('NORMAL'))
              .with('v', () => changeMode('SELECT'))
              .otherwise(() => e.preventDefault())
          )
          .with('BLOCKHINT', () => {
            match(buffer)
              .with('Escape', () => {
                DomUtils.removeElement(document.getElementById('hintContainer') as HTMLElement)
                changeMode('NORMAL')
                buffer = ''
              })
              .otherwise(() => {
                e.preventDefault()
                buffer = ''
              })
          })
          .exhaustive()
      )
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
    gridNum,
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
