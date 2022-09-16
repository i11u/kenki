import React from 'react'
import { match } from 'ts-pattern'
import styled from 'styled-components'
import Icon from '../common/icon'
import normalArrowInward from '../../assets/icons/normal-arrow-inward.svg'
import normalArrowOutward from '../../assets/icons/normal-arrow-outward.svg'
import thickArrowOutward from '../../assets/icons/thick-arrow-outward.svg'
import { ContentData } from './sidebar'

const Content = ({ buffer, content, isSelected }: { buffer: string; content: ContentData; isSelected: boolean }) => {
  const { key, description } = content
  const svg = match(key)
    .with('normal-arrow-inward', () => normalArrowInward)
    .with('normal-arrow-outward', () => normalArrowOutward)
    .with('thick-arrow-outward', () => thickArrowOutward)
    .otherwise(() => '')

  const arr = description.split(buffer)

  return (
    <StyledFlex style={{ backgroundColor: isSelected ? '#363c44' : '' }}>
      <Icon
        src={svg}
        alt="arrow svg"
        style={{
          position: 'relative',
          width: '30%',
          height: 'fit-content',
          marginTop: '-16px',
          marginLeft: '10%',
        }}
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
