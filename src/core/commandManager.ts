const CommandManager = {
  loadKeyMapings(customKeyMappings: string) {
    console.log('loadKeyMappings')
  },
}

const defaultKeyMappings = [
  // Move on the current page
  { keys: 'h', command: 'moveLeft' },
  { keys: 'j', command: 'moveDown' },
  { keys: 'k', command: 'moveUp' },
  { keys: 'l', command: 'moveRight' },
  { keys: '<C-b>', command: 'moveLeft' },
  { keys: '<C-n>', command: 'moveDown' },
  { keys: '<C-p>', command: 'moveUp' },
  { keys: '<C-f>', command: 'moveRight' },
  { keys: 'H', command: 'scrollLeft' },
  { keys: 'J', command: 'scrollDown' },
  { keys: 'K', command: 'scrollUp' },
  { keys: 'L', command: 'scrollRight' },
  { keys: '<S-C-b>', command: 'scrollLeft' },
  { keys: '<S-C-n>', command: 'scrollDown' },
  { keys: '<S-C-n>', command: 'scrollUp' },
  { keys: '<S-C-n>', command: 'scrollRight' },
  { keys: '<number>-h', command: 'moveLeftByOffset' },
  { keys: '<number>-j', command: 'moveDownByOffset' },
  { keys: '<number>-k', command: 'moveUpByOffset' },
  { keys: '<number>-l', command: 'moveRightByOffset' },
  /*
   * Hints
   * */
  { keys: 'f', command: 'showHints' },
]

const defaultExCommands = {}

const commandDescriptions = {}

export default CommandManager
