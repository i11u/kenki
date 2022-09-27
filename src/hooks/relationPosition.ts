import {Block} from '../jotai-hooks/blocks/atom'

/*
 * Calculate top, left, width, height of a relation from current gridNum and start/end block
 * */
function relationPosition(gridNum: { rowNum: number; colNum: number }, startBlock: Block, endBlock: Block) {
  const x1 = startBlock.position.col
  const y1 = startBlock.position.row
  const w1 = startBlock.width
  const h1 = startBlock.height

  const x2 = endBlock.position.col
  const y2 = endBlock.position.row
  const w2 = endBlock.width
  const h2 = endBlock.height

  /*
   * When an relation is parallel to grid
   * */
  const sameX = x2 + w2 / 2 === x1 + w1 / 2
  const sameY = y2 + h2 / 2 === y1 + h1 / 2
  if (sameY && x2 > x1 + w1) {
    return [
      `calc(${(100 / gridNum.rowNum) * (y1 + h1 / 2)}% - 10px)`,
      `calc(${(100 / gridNum.colNum) * (x1 + w1)}%)`,
      `calc(${(100 / gridNum.colNum) * (x2 - (x1 + w1))}%)`,
      `20px`,
      '0',
      '50%',
      '100%',
      '50%',
    ]
  }
  if (sameX && y2 > y1 + h1) {
    return [
      `calc(${(100 / gridNum.rowNum) * (y1 + h1)}%)`,
      `calc(${(100 / gridNum.colNum) * (x2 + w2 / 2)}% - 10px)`,
      `20px`,
      `calc(${(100 / gridNum.rowNum) * (y2 - (y1 + h1))}%)`,
      '50%',
      '0',
      '50%',
      '100%',
    ]
  }
  if (sameY && x1 > x2 + w2) {
    return [
      `calc(${(100 / gridNum.rowNum) * (y1 + h1 / 2)}% - 10px)`,
      `calc(${(100 / gridNum.colNum) * (x2 + w2)}%)`,
      `calc(${(100 / gridNum.colNum) * (x1 - (x2 + w2))}%)`,
      `20px`,
      '100%',
      '50%',
      '0',
      '50%',
    ]
  }
  if (sameX && y1 > y2 + h2) {
    return [
      `calc(${(100 / gridNum.rowNum) * (y2 + h2)}%)`,
      `calc(${(100 / gridNum.colNum) * (x2 + w2 / 2)}% - 10px)`,
      `20px`,
      `calc(${(100 / gridNum.rowNum) * (y1 - (y2 + h2))}%)`,
      '50%',
      '100%',
      '50%',
      '0',
    ]
  }

  const top = `calc(${
    y1 > y2 + h2
      ? (100 / gridNum.rowNum) * (y2 + h2)
      : y2 > y1 + h1
      ? (100 / gridNum.rowNum) * (y1 + h1)
      : y1 + h1 >= y2 + h2
      ? (100 / gridNum.rowNum) * (y2 + h2 / 2)
      : y1 + h1 < y2 + h2
      ? (100 / gridNum.rowNum) * (y1 + h1 / 2)
      : 0
  }% )`

  const height = `calc(${
    y1 > y2 + h2
      ? (100 / gridNum.rowNum) * (y1 - (y2 + h2))
      : y2 > y1 + h1
      ? (100 / gridNum.rowNum) * (y2 - (y1 + h1))
      : x2 > x1 + w1
      ? (100 / gridNum.rowNum) * Math.abs(y1 + h1 / 2 - (y2 + h2 / 2))
      : x1 > x2 + w2
      ? (100 / gridNum.rowNum) * Math.abs(y1 + h1 / 2 - (y2 + h2 / 2))
      : 0
  }%)`

  const left = `calc(${
    x2 + w2 / 2 > x1 + w1 / 2 && y1 > y2 + h2
      ? (100 / gridNum.colNum) * (x1 + w1 / 2)
      : x2 + w2 / 2 > x1 + w1 / 2 && y1 + h1 < y2
      ? (100 / gridNum.colNum) * (x1 + w1 / 2)
      : x2 + w2 / 2 > x1 + w1 / 2
      ? (100 / gridNum.colNum) * (x1 + w1)
      : x1 + w1 / 2 > x2 + w2 / 2 && y1 + h1 < y2
      ? (100 / gridNum.colNum) * (x2 + w2 / 2)
      : x1 + w1 / 2 > x2 + w2 / 2 && y1 > y2 + h2
      ? (100 / gridNum.colNum) * (x2 + w2 / 2)
      : x1 + w1 / 2 > x2 + w2 / 2
      ? (100 / gridNum.colNum) * (x2 + w2)
      : 0
  }% )`

  const width = `calc(${
    y1 > y2 + h2
      ? (100 / gridNum.colNum) * Math.abs(x1 + w1 / 2 - (x2 + w2 / 2))
      : y2 > y1 + h1
      ? (100 / gridNum.colNum) * Math.abs(x1 + w1 / 2 - (x2 + w2 / 2))
      : x2 > x1 + w1
      ? (100 / gridNum.colNum) * (x2 - (x1 + w1))
      : x1 > x2 + w2
      ? (100 / gridNum.colNum) * (x1 - (x2 + w2))
      : 0
  }%)`

  const arr = () => {
    const isUpper = y2 + h2 / 2 < y1 + h1 / 2
    const isRight = x2 + w2 / 2 > x1 + w1 / 2
    return (
      /* upper right */
      isUpper && isRight
        ? ['0', '100%', '100%', '0']
        : /* lower right */
        !isUpper && isRight
        ? ['0', '0', '100%', '100%']
        : // lower left
        !isUpper && !isRight
        ? ['100%', '0', '0', '100%']
        : // upper left
        isUpper && !isRight
        ? ['100%', '100%', '0', '0']
        : ['0', '0', '0', '0']
    )
  }

  return [top, left, width, height, ...arr()]
}

export default relationPosition
