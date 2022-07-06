import React from 'react'
import { Block } from '../states/block'
import { Position } from '../types/position'
import { emptyBlock } from './block'

export class CursorUtil {
  public static handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    userId: string,
    position: Position,
    addBlock: (block: Block) => void
  ) => {
    e.preventDefault()
    console.log(e)
    const cursor = document.getElementById(`cursor-${userId}`) as HTMLDivElement
    cursor.style.display = 'none'
    cursor.blur()
    addBlock(emptyBlock({ id: 'aaa', position, content: null }))
  }
}
