import React from 'react'
import { match } from 'ts-pattern'
import styled from 'styled-components'
import Icon from '../common/icon'
import normalInwardLabel from '../../assets/icons/normal-inward-label.svg'
import normalOutwardLabels from '../../assets/icons/normal-outward-labels.svg'
import thickOutwardLabels from '../../assets/icons/thick-outward-labels.svg'
import { ContentData } from './sidebar'

const Content = ({ buffer, content, isSelected }: { buffer: string; content: ContentData; isSelected: boolean }) => {
  const { key, description } = content
  const svg = match(key)
    .with('normal-inward-label', () => normalInwardLabel)
    .with('normal-outward-labels', () => normalOutwardLabels)
    .with('thick-outward-labels', () => thickOutwardLabels)
    .otherwise(() => '')

  const arr = description.split(buffer)

  return (
    <StyledFlex style={{ backgroundColor: isSelected ? '#363c44' : '' }}>
      <Icon
        src={svg}
        alt="arrow svg"
        style={{ position: 'relative', width: '35%', height: 'fit-content', marginLeft: '5%' }}
      />
      <StyledText>
        {arr.map((str, index) => {
          if (index === arr.length - 1) {
            return <span>{str}</span>
          }
          return (
            <span>
              <span>{str}</span>
              <span style={{ color: 'red' }}>{buffer}</span>
            </span>
          )
        })}
      </StyledText>
    </StyledFlex>
  )
}

const StyledFlex = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const StyledText = styled.div`
  position: relative;
  color: white;
  width: 50%;
  margin-right: 5%;
`

export default React.memo(Content)
