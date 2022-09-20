import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { PrimitiveAtom, useAtomValue } from 'jotai'
import * as d3 from 'd3'
import { Relation } from '../../../jotai-hooks/relations/atom'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { Block } from '../../../jotai-hooks/blocks/atom'
import { relationActions, useRemoveRelation, useUpdateLabelInRelation } from '../../../jotai-hooks/relations/action'
import { blocksActions } from '../../../jotai-hooks/blocks/action'
import { modeActions } from '../../../jotai-hooks/mode/action'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

const RelationTSX = ({ relationAtom }: { relationAtom: PrimitiveAtom<Relation> }) => {
  const relation = useAtomValue(relationAtom)
  const startBlock = blockSelectors.useBlockById(relation.startBlockId as string)
  const endBlock = blockSelectors.useBlockById(relation.endBlockId as string)
  const removeRelation = useRemoveRelation()

  if (startBlock === undefined || endBlock === undefined) removeRelation(relation.id)

  const gridNum = pageConfigSelectors.useGridNum()
  const top = `calc(${(100 / gridNum.rowNum) * ((startBlock as Block).position.row + (startBlock as Block).height)}% )`
  const left = `calc(${(100 / gridNum.colNum) * ((startBlock as Block).position.col + (startBlock as Block).width)}% )`
  const width = `calc(${
    (100 / gridNum.colNum) *
    ((endBlock as Block).position.col - (startBlock as Block).position.col - (startBlock as Block).width)
  }%)`
  const height = `calc(${
    (100 / gridNum.rowNum) *
    ((endBlock as Block).position.row - (startBlock as Block).position.row - (startBlock as Block).height)
  }%)`
  const ref = useRef<HTMLInputElement>(null)
  const updateLabelText = useUpdateLabelInRelation()
  const changeRelationStatus = relationActions.useChangeRelationStatus()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeMode = modeActions.useSwitchModes()
  const colorTheme = colorThemeSelector.useColorTheme()

  useEffect(() => {
    if (relation.editing) {
      ref.current?.focus()
    } else {
      ref.current?.blur()
    }
  }, [relation])

  useEffect(() => {
    const dom = ref.current as HTMLInputElement
    dom.style.width = `${dom.value.length}ch`
  }, [relation.label])

  useEffect(() => {
    if (relation.endBlockId === undefined) {
      console.log('end block is undefined')
    } else {
      console.log('end block is defined')
    }
  }, [relation])

  useLayoutEffect(() => {
    const line = d3.select(`#relation-${relation.id}`).selectAll<SVGLineElement, Relation>('line').data([relation])

    line
      .enter()
      .append('line')
      .merge(line)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', '100%')
      .attr('y2', '100%')
      .attr('stroke', colorTheme.textPrimary)
      .attr('stroke-width', '1px')
      .attr('marker-end', 'url(#triangle)')

    line.exit().remove()
  }, [colorTheme.textPrimary, relation])

  return (
    <div
      id={`relation-${relation.id}-wrapper`}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
      }}
    >
      <input
        ref={ref}
        value={relation.label}
        onChange={(e) => updateLabelText({ relationId: relation.id, label: e.target.value })}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'auto',
          height: '14px',
          fontSize: '8px',
          resize: 'none',
          outline: 'none',
          border: relation.editing ? `0.5px dashed ${colorTheme.textPrimary}` : 'none',
          backgroundColor: 'transparent',
          color: colorTheme.textPrimary,
          textAlign: 'center',
          transform: 'rotate(0.125turn)',
          transformOrigin: '0 0',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            changeRelationStatus({
              relationId: relation.id,
              isSelected: false,
              editing: false,
            })
            changeBlockStatus({
              blockId: relation.endBlockId as string,
              isEmpty: true,
              isSelected: true,
              editing: false,
            })
            changeMode('SELECT')
          }
        }}
      />
      <svg id={`relation-${relation.id}`} style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <defs>
          <marker
            id="triangle"
            viewBox="0 0 15 7.5"
            refX="15"
            refY="7.5"
            markerWidth="7.5"
            markerHeight="15"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 15 7.5 L 0 15 z" fill={colorTheme.textPrimary} />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

export default React.memo(RelationTSX)
