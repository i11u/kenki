import React from 'react'
import { v4 } from 'uuid'
import { Position } from '../types/position'
import { Block } from '../states/block'
import { CELL_LENGTH, MAX_COL, MAX_ROW } from '../constants/pageSize'

export class BlockUtil {
  private static isInterrupted = false

  public static composeBlock = (
    id: string,
    page: number,
    position: Position,
    width: number,
    height: number,
    blocks: Block[] | null,
    isEmpty: boolean,
    isSelected: boolean,
    editing: boolean
  ): Block => ({
    id,
    page,
    position,
    width,
    height,
    blocks,
    isEmpty,
    isSelected,
    editing,
  })

  public static emptyBlock = ({ position }: { position: Position }) =>
    this.composeBlock(v4(), 0, position, 1, 1, null, true, false, true)

  /**
   * When any input comes in unsettledBlock,
   * the wrapper will resize according to the size of the block.
   * */
  public static handleOnInput = ({
    e,
    id,
    changeBlockSize,
  }: {
    e: React.FormEvent<HTMLDivElement>
    id: string
    changeBlockSize: (blockId: string, width: number, height: number) => void
  }) => {
    const block = document.getElementById(`block-${id}`) as HTMLDivElement
    return block.textContent === '' && block.childElementCount === 0
      ? changeBlockSize(id, 1, 1)
      : changeBlockSize(id, Math.ceil(block.offsetWidth / CELL_LENGTH), Math.ceil(block.offsetHeight / CELL_LENGTH))
  }

  /**
   * Unsettled block will move when arrow keys are pressed,
   * without any element inside of contenteditable.
   * */
  public static handleOnKeyDownWrapper = ({
    e,
    id,
    block,
    nextBlock,
    changeBlockPosition,
    changeBlockStatus,
    setInputValue,
  }: {
    e: React.KeyboardEvent<HTMLDivElement>
    id: string
    block: Block
    nextBlock: Block | undefined
    changeBlockPosition: (blockId: string, position: Position) => void
    changeBlockStatus: (blockId: string, isEmpty: boolean, isSelected: boolean, editing: boolean) => void
    setInputValue: (str: string) => void
  }) => {
    const key = e.keyCode || e.charCode
    const { row, col } = block.position

    if (e.shiftKey) {
      if (key !== 16) {
        this.isInterrupted = true
      } else {
        this.isInterrupted = false
      }
    }

    if (block.isSelected) {
      setInputValue(e.key)

      switch (key) {
        case 9: // Tab
          e.preventDefault()
          changeBlockStatus(id, block.isEmpty, false, false)
          if (nextBlock) {
            changeBlockStatus(nextBlock.id, nextBlock.isEmpty, true, true)
          }
          break
        case 37: // ArrowLeft
          if (col > 0) {
            changeBlockPosition(id, { row, col: col - 1 })
          }
          break
        case 38: // ArrowUp
          if (row > 0) {
            changeBlockPosition(id, { row: row - 1, col })
          }
          break
        case 39: // ArrowRight
          if (col < MAX_COL - 1) {
            changeBlockPosition(id, { row, col: col + 1 })
          }
          break
        case 40: // ArrowDown
          if (row < MAX_ROW - 1) {
            changeBlockPosition(id, { row: row + 1, col })
          }
          break
        default:
          e.preventDefault()
      }
      return
    }

    const blockDiv = document.getElementById(`block-${id}`) as HTMLDivElement

    if (blockDiv.textContent !== '') return

    switch (key) {
      case 37: // ArrowLeft
        if (col > 0) {
          changeBlockPosition(id, { row, col: col - 1 })
        }
        break
      case 38: // ArrowUp
        if (row > 0) {
          changeBlockPosition(id, { row: row - 1, col })
        }
        break
      case 39: // ArrowRight
        if (col < MAX_COL - 1) {
          changeBlockPosition(id, { row, col: col + 1 })
        }
        break
      case 40: // ArrowDown
        if (row < MAX_ROW - 1) {
          changeBlockPosition(id, { row: row + 1, col })
        }
        break
      default:
    }
  }

  public static handleOnKeyDown = ({
    e,
    block,
    changeBlockStatus,
    addBlock,
    setInputValue,
  }: {
    e: React.KeyboardEvent<HTMLDivElement>
    block: Block
    changeBlockStatus: (blockId: string, isEmpty: boolean, isSelected: boolean, editing: boolean) => void
    addBlock: (block: Block) => void
    setInputValue: (str: string) => void
  }) => {
    if (block.isSelected) return
    const key = e.keyCode || e.charCode
    const { row, col } = block.position

    setInputValue(e.key)

    switch (key) {
      case 9:
        e.preventDefault()
        changeBlockStatus(block.id, block.isEmpty, block.isSelected, false)
        // eslint-disable-next-line no-case-declarations
        const nextPosition =
          col + block.width + 3 > MAX_COL - 3
            ? { row: row + block.height + 3, col: 3 }
            : {
                row,
                col: col + block.width + 3,
              }

        addBlock(BlockUtil.emptyBlock({ position: nextPosition }))
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
  public static handleOnClick = ({ e, id }: { e: React.MouseEvent<HTMLDivElement>; id: string }) => {
    e.preventDefault()
    const block = document.getElementById(`block-${id}`) as HTMLDivElement
    block.focus()
  }

  /**
   * TODO: When some html element is pasted in contenteditable, it has to resize according to the content.
   * */
  public static handleOnPaste = ({ e }: { e: React.ClipboardEvent<HTMLDivElement> }) => {
    e.preventDefault()
  }

  public static handleOnKeyUp = ({
    e,
    block,
    changeBlockStatus,
  }: {
    e: React.KeyboardEvent<HTMLDivElement>
    block: Block
    changeBlockStatus: (blockId: string, isEmpty: boolean, isSelected: boolean, editing: boolean) => void
  }) => {
    const key = e.keyCode || e.charCode

    if (!block.isSelected) {
      switch (key) {
        case 16:
          if (this.isInterrupted) return
          changeBlockStatus(block.id, block.isEmpty, true, block.editing)
          break
        default:
      }
    } else {
      switch (key) {
        case 16:
          if (this.isInterrupted) return
          changeBlockStatus(block.id, block.isEmpty, false, true)
          break
        default:
      }
    }
  }
}
