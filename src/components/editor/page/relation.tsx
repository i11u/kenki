import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { PrimitiveAtom, useAtomValue } from 'jotai'
import * as d3 from 'd3'
import { Relation } from '../../../jotai-hooks/relations/atom'
import { blockSelectors } from '../../../jotai-hooks/blocks/selector'
import { pageConfigSelectors } from '../../../jotai-hooks/pageConfig/selector'
import { relationActions, useRemoveRelation, useUpdateLabelInRelation } from '../../../jotai-hooks/relations/action'
import { blocksActions } from '../../../jotai-hooks/blocks/action'
import { modeActions } from '../../../jotai-hooks/mode/action'
import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'
import relationPosition from '../../../hooks/relationPosition'
import { Block } from '../../../jotai-hooks/blocks/atom'
import relationParam from '../../../hooks/relationParam'
import { modeSelectors } from '../../../jotai-hooks/mode/selector'

const RelationTSX = ({ relationAtom }: { relationAtom: PrimitiveAtom<Relation> }) => {
  const relation = useAtomValue(relationAtom)
  const startBlock = blockSelectors.useBlockById(relation.startBlockId as string)
  const endBlock = blockSelectors.useBlockById(relation.endBlockId as string)
  const removeRelation = useRemoveRelation()

  if (startBlock === undefined || endBlock === undefined) removeRelation(relation.id)

  const gridNum = pageConfigSelectors.useGridNum()

  const ref = useRef<HTMLInputElement>(null)
  const updateLabelText = useUpdateLabelInRelation()
  const changeRelationStatus = relationActions.useChangeRelationStatus()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeMode = modeActions.useSwitchModes()
  const colorTheme = colorThemeSelector.useColorTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [top, left, width, height, x1, y1, x2, y2] = relationPosition(gridNum, startBlock as Block, endBlock as Block)
  const scale = pageConfigSelectors.usePageScale()
  const mode = modeSelectors.useCurrentMode()

  const aspectRatio = pageConfigSelectors.useAspectRatio()

  useEffect(() => {
    changeRelationStatus({
      relationId: relation.id,
      isSelected: relation.isSelected,
      editing: relation.editing,
      scale,
    })
  }, [changeRelationStatus, relation.editing, relation.id, relation.isSelected, scale])

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
    if (relation.type === 'normal') {
      const svg = d3.select(`#relation-${relation.id}`).selectAll<SVGLineElement, Relation>('line').data([relation])
      svg
        .enter()
        .append('line')
        .merge(svg)
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', colorTheme.textPrimary)
        .attr('stroke-width', '1px')
        .attr(relation.orient === 'outward' ? 'marker-end' : 'marker-start', 'url(#triangle)')
      svg.exit().remove()
    } else if (relation.type === 'thick') {
      const svg2 = d3.select(`#relation-${relation.id}`).selectAll<SVGPathElement, Relation>('path').data([relation])
      const rect = wrapperRef.current?.getBoundingClientRect() as DOMRect
      const [dx, dy, angle, translateX, translateY] = relationParam(
        gridNum,
        startBlock as Block,
        endBlock as Block,
        rect
      )
      const len = Math.sqrt(rect.width * rect.width + rect.height * rect.height) - 15
      const lineWidth = 5 * scale
      const arrowheadWidth = 10 * scale
      const arrowheadLength = 10 * scale
      const dW = (arrowheadWidth - lineWidth) * scale
      const d = [
        'M',
        0,
        -lineWidth / 2,
        'h',
        len - arrowheadLength,
        'v',
        -dW / 2,
        'L',
        len,
        0,
        'L',
        len - arrowheadLength,
        arrowheadWidth / 2,
        'v',
        -dW / 2,
        'H',
        0,
        'Z',
      ]

      // // 大きさをscale倍する
      // const zoomedWidth = rect.width * scale
      // const zoomedHeight = rect.height * scale
      //
      // // 中心の座標を計算する
      // const centerX = rect.width / 2.0
      // const centerY = rect.height / 2.0
      //
      // // scale倍したあとのmin-xとmin-yを計算する
      // const zoomedMinX = centerX - zoomedWidth / 2.0
      // const zoomedMinY = centerY - zoomedHeight / 2.0
      //
      // // viewBoxを更新
      // const zoomedViewBox = [zoomedMinX, zoomedMinY, zoomedWidth, zoomedHeight].join(' ')

      console.log(rect)

      svg2
        .enter()
        .append('path')
        .merge(svg2)
        .attr('position', 'absolute')
        .attr('stroke', colorTheme.textPrimary)
        .attr('stroke-width', `${scale}`)
        .attr('fill', colorTheme.background)
        .attr('d', d.join(' '))
        // .attr('viewBox', zoomedViewBox)
        // .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr(
          'transform',
          `${scale < 0.1 ? '' : `scale(${1 / scale})`} translate(${translateX} ${translateY}) rotate(${angle})`
        )

      svg2.exit().remove()
    }
  }, [colorTheme.background, colorTheme.textPrimary, endBlock, gridNum, relation, startBlock, x1, x2, y1, y2, scale])

  return (
    <div
      id={`relation-${relation.id}-wrapper`}
      ref={wrapperRef}
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height,
        // border: '1px solid black',
        display:
          top === 'calc(0%)' || left === 'calc(0%)' || width === 'calc(0%)' || height === 'calc(0%)' ? 'none' : 'block',
        zIndex: 0,
        opacity: mode === 'SELECT' ? '0.2' : '',
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
          transform: 'translate(-60%, -40%)',
          width: 'auto',
          height: '14px',
          fontSize: aspectRatio === 'document' ? '14px' : '10px',
          resize: 'none',
          outline: 'none',
          border: relation.editing ? `0.5px dashed ${colorTheme.textPrimary}` : 'none',
          backgroundColor: colorTheme.page,
          color: colorTheme.textPrimary,
          textAlign: 'center',
          zIndex: 2,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            changeRelationStatus({
              relationId: relation.id,
              isSelected: false,
              editing: false,
              scale,
            })
            changeBlockStatus({
              blockId: relation.endBlockId as string,
              isEmpty: true,
              isSelected: true,
              editing: false,
            })
            changeMode('SELECT')
          } else if (e.key === 'Escape') {
            removeRelation(relation.id)
            changeMode('NORMAL')
          }
        }}
        onClick={(e) => {
          changeRelationStatus({ relationId: relation.id, isSelected: false, editing: true, scale })
          changeMode('EDIT')
        }}
      />
      <svg
        id={`relation-${relation.id}`}
        style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible', zIndex: 1 }}
      >
        {relation.type === 'normal' ? (
          <defs>
            <marker
              id="triangle"
              viewBox="0 0 15 15"
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
        ) : null}
      </svg>
    </div>
  )
}

export default React.memo(RelationTSX)
