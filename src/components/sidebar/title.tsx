import styled from 'styled-components'
import { match } from 'ts-pattern'
import React from 'react'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import Icon from '../common/icon'
import relationSvg from '../../assets/icons/arrows.svg'

const Title = () => {
  const mode = modeSelectors.useCurrentMode()
  const title = match(mode)
    .with('INSERT', () => 'Insert Relation')
    .otherwise(() => '')

  return (
    <StyledFlex>
      <StyledTitle>{title}</StyledTitle>
      <Icon
        src={relationSvg}
        alt={relationSvg}
        style={{ position: 'relative', width: '18px', height: '28px', marginTop: '-10px' }}
      />
    </StyledFlex>
  )
}

const StyledFlex = styled.div`
  position: relative;
  margin-top: 40px;
  margin-left: 40px;
  display: flex;
  gap: 0 15px;
  height: fit-content;
`

const StyledTitle = styled.div`
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: white;
`

export default React.memo(Title)
