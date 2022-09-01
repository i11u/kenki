import { useEffect } from 'react'
import { match } from 'ts-pattern'
import Header from './header/header'
import Sidebar from './sidebar/sidebar'
import Background from './page/background'
import Page from './page/page'
import Mode from './footer/mode'
import { modeSelectors } from '../jotai-hooks/mode/selector'
import { modeActions } from '../jotai-hooks/mode/action'
import { blockSelectors } from '../jotai-hooks/blocks/selector'
import { useMoveBlock } from '../jotai-hooks/blocks/action'

const Editor = () => {
  const editingBlockId = blockSelectors.useEditingBlockId()
  const mode = modeSelectors.useCurrentMode()
  const changeMode = modeActions.useSwitchModes()
  const moveBlockLeft = useMoveBlock()

  useEffect(() => {
    const callback = (e: KeyboardEvent) =>
      match(mode)
        .with('NORMAL', () =>
          match(e.key)
            .with(':', () => changeMode('COMMAND'))
            .with('i', () => changeMode('EDIT'))
            .with('v', () => changeMode('SELECT'))
            .with('h', () => moveBlockLeft({ blockId: editingBlockId, direction: 'left' }))
            .with('j', () => moveBlockLeft({ blockId: editingBlockId, direction: 'down' }))
            .with('k', () => moveBlockLeft({ blockId: editingBlockId, direction: 'up' }))
            .with('l', () => moveBlockLeft({ blockId: editingBlockId, direction: 'right' }))
            .otherwise(() => e.preventDefault())
        )
        .with('COMMAND', () =>
          match(e.key)
            .with('Escape', () => changeMode('NORMAL'))
            .otherwise(() => e.preventDefault())
        )
        .with('EDIT', () =>
          match(e.key)
            .with('Escape', () => changeMode('NORMAL'))
            .otherwise(() => console.log('s'))
        )
        .with('SELECT', () =>
          match(e.key)
            .with('v', () => changeMode('MULTISELECT'))
            .with('h', () => moveBlockLeft({ blockId: editingBlockId, direction: 'left' }))
            .with('j', () => moveBlockLeft({ blockId: editingBlockId, direction: 'down' }))
            .with('k', () => moveBlockLeft({ blockId: editingBlockId, direction: 'up' }))
            .with('l', () => moveBlockLeft({ blockId: editingBlockId, direction: 'right' }))
            .with('Escape', () => changeMode('NORMAL'))
            .otherwise(() => e.preventDefault())
        )
        .with('MULTISELECT', () =>
          match(e.key)
            .with('v', () => changeMode('SELECT'))
            .with('Escape', () => changeMode('NORMAL'))
            .otherwise(() => e.preventDefault())
        )
        .exhaustive()
    document.addEventListener('keydown', callback)

    return function cleanup() {
      document.removeEventListener('keydown', callback)
    }
  }, [mode, changeMode, moveBlockLeft, editingBlockId])

  // const setInputValue = inputActions.useSetInputValue()
  // useEffect(() => {
  //   document.addEventListener('keydown', (e) => setInputValue(e.key))
  // }, [setInputValue])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* <Input /> */}
      <Header />
      <Sidebar />
      <Background>
        <Page />
      </Background>
      <Mode />
    </div>
  )
}

export default Editor
