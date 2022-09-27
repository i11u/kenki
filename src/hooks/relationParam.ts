import { Block } from '../jotai-hooks/blocks/atom'

const relationParam = (
  gridNum: { rowNum: number; colNum: number },
  startBlock: Block,
  endBlock: Block,
  rect: DOMRect
) => {
  const x1 = startBlock.position.col
  const y1 = startBlock.position.row
  const w1 = startBlock.width
  const h1 = startBlock.height

  const x2 = endBlock.position.col
  const y2 = endBlock.position.row
  const w2 = endBlock.width
  const h2 = endBlock.height

  const dx = x2 + w2 / 2 === x1 + w1 / 2 ? 0 : x2 + w2 / 2 > x1 + w1 / 2 ? rect.width : -rect.width
  const dy = y2 + h2 / 2 === y1 + h1 / 2 ? 0 : y2 + h2 / 2 < y1 + h1 / 2 ? -rect.height + 5 : rect.height - 5

  const thetaRad = Math.atan2(dy, dx)
  const angle = (thetaRad * 180) / Math.PI + (thetaRad > 0 ? 0 : 360)

  const translateX = x2 + w2 / 2 === x1 + w1 / 2 ? 10 : x2 + w2 / 2 > x1 + w1 / 2 ? 0 : rect.width
  const translateY =
    y1 > y2 + h2
      ? rect.height - 5
      : y2 > y1 + h1
      ? 5
      : y1 + h1 / 2 > y2 + h2 / 2
      ? rect.height + 2
      : y1 + h1 / 2 < y2 + h2 / 2
      ? 3
      : 12

  return [dx, dy, angle, translateX, translateY]
}

export default relationParam
