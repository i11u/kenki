import React from 'react'
import { v4 } from 'uuid'
import { Block, Position } from '../jotai-hooks/blocks/atom'

export class BlockUtils {
  private static isInterrupted = false

  public static style = (block: Block, gridNum: { rowNum: number; colNum: number }, blockBorderIsVisible: boolean) => ({
    top: `calc(${block.position.row * (100 / gridNum.rowNum)}% ${blockBorderIsVisible ? '' : '+ 1px'})`,
    left: `calc(${block.position.col * (100 / gridNum.colNum)}% ${blockBorderIsVisible ? '' : '+ 1px'})`,
    width: `calc(${100 / gridNum.colNum}% - 1px + ${(100 / gridNum.colNum) * (block.width - 1)}%)`,
    height: `calc(${100 / gridNum.rowNum}% - 1px + ${(100 / gridNum.rowNum) * (block.height - 1)}%)`,
    minWidth: `calc(${100 / gridNum.colNum}% - 1px)`,
    minHeight: `calc(${100 / gridNum.rowNum}% - 1px)`,
  })

  static composeBlock = (
    id: string,
    page: number,
    position: Position,
    width: number,
    height: number,
    blocks: Block[] | null,
    isEmpty: boolean,
    isSelected: boolean,
    editing: boolean,
    defaultInnerHTML: string,
    innerHTML: string
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
    defaultInnerHTML,
    innerHTML,
  })

  public static emptyBlock = ({ position }: { position: Position }) =>
    this.composeBlock(v4(), 0, position, 1, 1, null, true, false, true, '', '')

  /**
   * When any input comes in unsettledBlock,
   * the wrapper will resize according to the size of the blocks.
   * */
  public static handleOnInput = ({
    e,
    id,
    changeBlockSize,
    cellLength,
    updateInnerHTML,
  }: {
    e: React.FormEvent<HTMLDivElement>
    id: string
    changeBlockSize: ({ blockId, width, height }: { blockId: string; width: number; height: number }) => void
    cellLength: number
    updateInnerHTML: ({ blockId, innerHTML }: { blockId: string; innerHTML: string }) => void
  }) => {
    const block = document.getElementById(`block-${id}`) as HTMLDivElement
    updateInnerHTML({ blockId: id, innerHTML: block.innerHTML ? block.innerHTML : '' })
    return block.textContent === '' && block.childElementCount === 0
      ? changeBlockSize({ blockId: id, width: 1, height: 1 })
      : changeBlockSize({
          blockId: id,
          width: Math.ceil((block.clientWidth - 1) / cellLength),
          height: Math.ceil((block.clientHeight - 1) / cellLength),
        })
  }

  /**
   * Unsettled blocks will move when arrow keys are pressed,
   * without any element inside of contenteditable.
   * */
  public static handleOnKeyDownWrapper = ({
    e,
    id,
    block,
    nextBlock,
    changeBlockPosition,
    changeBlockStatus,
    blockDOM,
    rowNum,
    colNum,
  }: {
    e: React.KeyboardEvent<HTMLDivElement>
    id: string
    block: Block
    nextBlock: { id: string; isEmpty: boolean }
    changeBlockPosition: ({ blockId, position }: { blockId: string; position: Position }) => void
    changeBlockStatus: ({
      blockId,
      isEmpty,
      isSelected,
      editing,
    }: {
      blockId: string
      isEmpty: boolean
      isSelected: boolean
      editing: boolean
    }) => void
    blockDOM: HTMLDivElement
    rowNum: number
    colNum: number
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
      switch (key) {
        // case 9: // Tab
        //   e.preventDefault()
        //   changeBlockStatus({ blockId: id, isEmpty: block.isEmpty, isSelected: false, editing: false })
        //   if (nextBlock.id !== id) {
        //     changeBlockStatus({
        //       blockId: nextBlock.id,
        //       isEmpty: nextBlock.isEmpty,
        //       isSelected: true,
        //       editing: true,
        //     })
        //   }
        //   break
        case 37: // ArrowLeft
          e.preventDefault()
          if (col > 0) {
            changeBlockPosition({ blockId: id, position: { row, col: col - 1 } })
          }
          break
        case 38: // ArrowUp
          e.preventDefault()

          if (row > 0) {
            changeBlockPosition({ blockId: id, position: { row: row - 1, col } })
          }
          break
        case 39: // ArrowRight
          e.preventDefault()

          if (col < colNum - 1) {
            changeBlockPosition({ blockId: id, position: { row, col: col + 1 } })
          }
          break
        case 40: // ArrowDown
          e.preventDefault()

          if (row < rowNum - 1) {
            changeBlockPosition({ blockId: id, position: { row: row + 1, col } })
          }
          break
        default:
          e.preventDefault()
      }
      return
    }

    if (blockDOM.textContent !== '') return

    switch (key) {
      case 37: // ArrowLeft
        if (col > 0) {
          changeBlockPosition({ blockId: id, position: { row, col: col - 1 } })
        }
        break
      case 38: // ArrowUp
        if (row > 0) {
          changeBlockPosition({ blockId: id, position: { row: row - 1, col } })
        }
        break
      case 39: // ArrowRight
        if (col < colNum - 1) {
          changeBlockPosition({ blockId: id, position: { row, col: col + 1 } })
        }
        break
      case 40: // ArrowDown
        if (row < rowNum - 1) {
          changeBlockPosition({ blockId: id, position: { row: row + 1, col } })
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
    rowNum,
    colNum,
  }: {
    e: React.KeyboardEvent<HTMLDivElement>
    block: Block
    changeBlockStatus: ({
      blockId,
      isEmpty,
      isSelected,
      editing,
    }: {
      blockId: string
      isEmpty: boolean
      isSelected: boolean
      editing: boolean
    }) => void
    // eslint-disable-next-line @typescript-eslint/no-shadow
    addBlock: ({ block }: { block: Block }) => void
    rowNum: number
    colNum: number
  }) => {
    if (block.isSelected) return
    const key = e.keyCode || e.charCode
    const { row, col } = block.position

    switch (key) {
      case 9:
        e.preventDefault()
        // changeBlockStatus({
        //   blockId: block.id,
        //   isEmpty: block.isEmpty,
        //   isSelected: block.isSelected,
        //   editing: false,
        // })
        // // eslint-disable-next-line no-case-declarations
        // const nextPosition =
        //   col + block.width + 3 > colNum - 3
        //     ? { row: row + block.height + 3, col: 3 }
        //     : {
        //         row,
        //         col: col + block.width + 1,
        //       }
        // addBlock({ block: BlockUtils.emptyBlock({ position: nextPosition }) })
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
  public static handleOnDoubleClick = ({
    e,
    id,
    changeScale,
  }: {
    e: React.MouseEvent<HTMLDivElement>
    id: string
    changeScale: (scale: number) => void
  }) => {
    e.preventDefault()
    const block = document.getElementById(`block-${id}`) as HTMLDivElement
    block.focus()
    changeScale(1.5)
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
    changeBlockStatus: ({
      blockId,
      isEmpty,
      isSelected,
      editing,
    }: {
      blockId: string
      isEmpty: boolean
      isSelected: boolean
      editing: boolean
    }) => void
  }) => {
    const key = e.keyCode || e.charCode

    if (!block.isSelected) {
      switch (key) {
        case 16:
          // if (this.isInterrupted) return
          // changeBlockStatus({
          //   blockId: block.id,
          //   isEmpty: block.isEmpty,
          //   isSelected: true,
          //   editing: block.editing,
          // })
          break
        default:
      }
    } else {
      switch (key) {
        case 16:
          if (this.isInterrupted) return
          changeBlockStatus({ blockId: block.id, isEmpty: block.isEmpty, isSelected: false, editing: true })
          break
        default:
      }
    }
  }
}
