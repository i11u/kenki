import { useEffect } from 'react'
import { match } from 'ts-pattern'
import Header from './header/header'
import Sidebar from './sidebar/sidebar'
import Background from './editor/background'
import Page from './editor/page/page'
import { modeSelectors } from '../jotai-hooks/mode/selector'
import { modeActions } from '../jotai-hooks/mode/action'
import { blockSelectors } from '../jotai-hooks/blocks/selector'
import { blocksActions, Direction, useCreateBlock, useMoveBlock } from '../jotai-hooks/blocks/action'
import EditorConfig from './editor/editorConfig/editorConfig'
import { useMoveCursor, useMoveCursorByPosition } from '../jotai-hooks/cursor/action'
import { BlockUtils } from '../utils/block'
import { cursorSelector } from '../jotai-hooks/cursor/selector'
import { DomUtils } from '../utils/dom'
import { pageConfigSelectors } from '../jotai-hooks/pageConfig/selector'
import { editorConfigActions } from '../jotai-hooks/editorConfig/action'
import Footer from './footer/footer'

const App = () => {
  const editingBlockId = blockSelectors.useEditingBlockId()
  const editingBlock = blockSelectors.useEditingBlock()
  const selectedBlocks = blockSelectors.useSelectedBlocks()
  const mode = modeSelectors.useCurrentMode()
  const changeMode = modeActions.useSwitchModes()
  const moveCursor = useMoveCursor()
  const moveBlock = useMoveBlock()
  const createBlock = useCreateBlock()
  const cursorPosition = cursorSelector.useCursorPosition()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const moveCursorByPosition = useMoveCursorByPosition()
  const gridNum = pageConfigSelectors.useGridNum()
  const toggleSidebar = editorConfigActions.useToggleSidebar()

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
                  createBlock(BlockUtils.emptyBlock({ position: cursorPosition }))
                  changeMode('EDIT')
                  buffer = ''
                }
                e.preventDefault()
                buffer = ''
              })
              .with('r', () => {
                if (e.ctrlKey) {
                  changeMode('INSERT')
                  toggleSidebar()
                  buffer = ''
                }
                e.preventDefault()
                buffer = ''
              })
              .with('f', () => {
                changeMode('BLOCKHINT')
                //  Activate block hints
                const blockDOMs = Array.from(document.getElementsByClassName('block-wrapper'))
                const hints = blockDOMs.map((blockDOM) => {
                  const hint = document.createElement('div')
                  hint.id = blockDOM.id.slice(6, -8)
                  hint.className = 'hint'
                  hint.style.color = 'black'
                  hint.style.position = 'absolute'
                  hint.style.backgroundColor = '#ffdf5e'
                  const cellWidth = document.getElementById('cursor')?.clientWidth as number
                  const cellHeight = document.getElementById('cursor')?.clientHeight as number
                  hint.style.width = `${cellWidth}px`
                  hint.style.height = `${cellHeight}px`
                  hint.style.marginTop = '-20px'
                  hint.style.marginLeft = '-20px'
                  hint.style.border = '1px solid gray'
                  hint.style.borderRadius = '2px'
                  hint.style.fontFamily = 'Monaco, sans-serif'
                  const rawLabel = document.createElement('span')
                  rawLabel.innerText = hint.id.slice(0, 2)
                  hint.appendChild(rawLabel)
                  return hint
                })
                hints.map((hint) =>
                  (document.getElementById(`block-${hint.id}-wrapper`) as HTMLElement).appendChild(hint)
                )
                // const hintContainerDiv = DomUtils.addElementList(
                //   hints,
                //   document.getElementById('page') as HTMLElement,
                //   {
                //     id: 'hintContainer',
                //     className: '',
                //   }
                // )
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
          .with('INSERT', () =>
            match(buffer)
              .with('Escape', () => {
                toggleSidebar()
                changeMode('NORMAL')
                buffer = ''
              })
              .with('Enter', () => {
                e.preventDefault()
                buffer = ''
              })
              .otherwise(() => {
                buffer = ''
              })
          )
          .with('COMMAND', () =>
            match(buffer)
              .with('Escape', () => {
                changeMode('NORMAL')
                buffer = ''
              })
              //  In COMMAND mode, keystrokes are handled by listeners defined in each component.
              .otherwise(() => {
                buffer = ''
              })
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
                const selectedBlock = selectedBlocks[0]
                moveCursorByPosition({
                  row: selectedBlock.position.row + selectedBlock.height - 1,
                  col: selectedBlock.position.col + selectedBlock.width - 1,
                })
                changeMode('NORMAL')
                buffer = ''
              })
              .with('i', () => {
                changeMode('EDIT')
                buffer = ''
              })
              //  selectedBlockId is known to exist when entering SELECT mode.
              .with('h', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'left', offset: 1 })
                buffer = ''
              })
              .with('j', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'down', offset: 1 })
                buffer = ''
              })
              .with('k', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'up', offset: 1 })
                buffer = ''
              })
              .with('l', () => {
                moveBlock({ blockId: selectedBlocks[0].id, direction: 'right', offset: 1 })
                buffer = ''
              })
              .otherwise(() => {
                if (document.getElementById('shadowContainer')) {
                  DomUtils.removeElement(document.getElementById('shadowContainer') as HTMLDivElement)
                }
                if (/^\d+$/.test(buffer)) {
                  const blockDOM = document.getElementById(`block-${selectedBlocks[0].id}-wrapper`) as HTMLDivElement
                  const offset = Number(buffer)
                  const cellWidth = 100 / gridNum.colNum
                  const cellHeight = 100 / gridNum.rowNum
                  const directions: Direction[] = ['left', 'down', 'up', 'right']
                  const shadows = directions.map((direction) => {
                    const shadow = blockDOM.cloneNode(true) as HTMLDivElement
                    shadow.id = ''
                    shadow.style.position = 'absolute'
                    shadow.style.opacity = '0.2'
                    shadow.style.backgroundColor = 'cornflowerblue'
                    match(direction)
                      .with('left', () => {
                        shadow.style.left = `${cellWidth * (selectedBlocks[0].position.col - offset)}%`
                      })
                      .with('down', () => {
                        shadow.style.top = `${cellHeight * (selectedBlocks[0].position.row + offset)}%`
                      })
                      .with('up', () => {
                        shadow.style.top = `${cellHeight * (selectedBlocks[0].position.row - offset)}%`
                      })
                      .with('right', () => {
                        shadow.style.left = `${cellWidth * (selectedBlocks[0].position.col + offset)}%`
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
                  moveBlock({ blockId: selectedBlocks[0].id, direction: 'left', offset })
                  buffer = ''
                } else if (/^\d+j$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveBlock({ blockId: selectedBlocks[0].id, direction: 'down', offset })
                  buffer = ''
                } else if (/^\d+k$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveBlock({ blockId: selectedBlocks[0].id, direction: 'up', offset })
                  buffer = ''
                } else if (/^\d+l$/g.test(buffer)) {
                  const offset = Number(buffer.slice(0, -1))
                  moveBlock({ blockId: selectedBlocks[0].id, direction: 'right', offset })
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
            match(e.key)
              .with('Escape', () => {
                DomUtils.removeElements(document.getElementsByClassName('hint'))
                changeMode('NORMAL')
                buffer = ''
              })
              .otherwise(() => {
                const hints = Array.from(document.getElementsByClassName('hint'))
                hints.map((hint) => {
                  const reg = new RegExp(`^${hint.id.slice(0, 2)}$`)
                  console.log(hint.id)
                  console.log(buffer)
                  if (reg.test(buffer)) {
                    console.log(hint.id)
                    console.log(buffer)
                    changeBlockStatus({
                      blockId: hint.id,
                      isEmpty: false,
                      isSelected: true,
                      editing: false,
                    })
                    selectedBlocks.forEach((block) => {
                      if (block.id !== hint.id) {
                        changeBlockStatus({
                          blockId: block.id,
                          isEmpty: block.isEmpty,
                          isSelected: false,
                          editing: false,
                        })
                      }
                    })
                    DomUtils.removeElements(document.getElementsByClassName('hint'))
                    changeMode('SELECT')
                    buffer = ''
                    return false
                  }
                  return false
                })
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
    toggleSidebar,
    selectedBlocks,
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
      <Footer />
    </div>
  )
}

export default App
