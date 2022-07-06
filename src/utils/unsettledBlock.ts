import React from 'react'
import { CELL_LENGTH, MAX_COL, MAX_ROW } from '../constants/pageSize'
import { Position } from '../types/position'
import { UnsettledBlock } from '../states/unsettledBlock'

/**
 * When any input comes in unsettledBlock,
 * the wrapper will resize according to the size of the block.
 * */
export const handleOnInput = ({
  e,
  userId,
  changeUnsettledBlockSize,
}: {
  e: React.FormEvent<HTMLDivElement>
  userId: string
  changeUnsettledBlockSize: (userId: string, width: number, height: number) => void
}) => {
  const cursor = document.getElementById(`unsettled-block-${userId}`) as HTMLDivElement
  return cursor.textContent === '' && cursor.childElementCount === 0
    ? changeUnsettledBlockSize(userId, 1, 1)
    : changeUnsettledBlockSize(
        userId,
        Math.ceil(cursor.offsetWidth / CELL_LENGTH),
        Math.ceil(cursor.offsetHeight / CELL_LENGTH)
      )
}

/**
 * Unsettled block will move when arrow keys are pressed,
 * without any element inside of contenteditable.
 * */
export const handleOnKeyDown = ({
  e,
  userId,
  unsettledBlock,
  changeUnsettledBlockPos,
}: {
  e: React.KeyboardEvent<HTMLDivElement>
  userId: string
  unsettledBlock: UnsettledBlock
  changeUnsettledBlockPos: (userId: string, position: Position) => void
}) => {
  const cursor = document.getElementById(`unsettled-block-${userId}`) as HTMLDivElement
  if (cursor.textContent !== '') return

  const key = e.keyCode || e.charCode
  const { row, col } = unsettledBlock.block.position

  switch (key) {
    case 37: // ArrowLeft
      if (col > 0) {
        changeUnsettledBlockPos(userId, { row, col: col - 1 })
      }
      break
    case 38: // ArrowUp
      if (row > 0) {
        changeUnsettledBlockPos(userId, { row: row - 1, col })
      }
      break
    case 39: // ArrowRight
      if (col < MAX_COL - 1) {
        changeUnsettledBlockPos(userId, { row, col: col + 1 })
      }
      break
    case 40: // ArrowDown
      if (row < MAX_ROW - 1) {
        changeUnsettledBlockPos(userId, { row: row + 1, col })
      }
      break
    default:
  }
}

/**
 * To prevent an unfavorable behavior of the caret in contenteditable:
 * Caret on a contenteditable div disappears when clicking the div when it is focused.
 * Though, this may not be a good workaround...
 * @link [https://bugzilla.mozilla.org/show_bug.cgi?id=550434]
 * */
export const handleOnClick = ({ e, userId }: { e: React.MouseEvent<HTMLDivElement>; userId: string }) => {
  e.preventDefault()
  const cursor = document.getElementById(`unsettled-block-${userId}`) as HTMLDivElement
  cursor.focus()
}

/**
 * TODO: When some html element is pasted in contenteditable, it has to resize according to the content.
 * */
export const handleOnPaste = ({ e }: { e: React.ClipboardEvent<HTMLDivElement> }) => {
  e.preventDefault()
}

const saveBlock = () => {
  console.log('Hello, world!')
}
