import React from 'react'
import { Position } from '../types/position'
import { MAX_COL, MAX_ROW } from '../constants/pageSize'

export const getInitialCells = (): Position[][] => {
  const res = []
  for (let row = 0; row < MAX_ROW; row += 1) {
    const currentRow = []
    for (let col = 0; col < MAX_COL; col += 1) {
      currentRow.push({ row, col })
    }
    res.push(currentRow)
  }
  return res
}

export const getCell = (row: number, col: number) =>
  document.getElementById(`cell-${row}-${col}`) as HTMLTextAreaElement

export const getCellFromPos = (pos: Position) => {
  if (!pos) return undefined
  return document.getElementById(`cell-${pos.row}-${pos.col}`) as HTMLTextAreaElement
}

/**
 * When a cell is clicked, you change the cursor position.
 * */
export const handleOnCellMouseDown = ({
  row,
  col,
  userId,
  changeCursorPos,
}: {
  row: number
  col: number
  userId: string
  changeCursorPos: (userId: string, pos: Position) => void
}) => {
  const newPosition: Position = { row, col }
  changeCursorPos(userId, newPosition)
}

/**
 * When a , you:
 * 1. Create a new text block at the clicked position.
 * 2. Hide UnsettledBlock, and focus on the new text block.
 * */
export const handleOnCellKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  console.log(e)
}
