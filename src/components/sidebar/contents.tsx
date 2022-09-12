import React from 'react'
import styled from 'styled-components'
import Content from './content'
import { ContentData } from './sidebar'

const Contents = ({
  buffer,
  selectedContentIndex,
  matchingContents,
}: {
  buffer: string
  selectedContentIndex: number
  matchingContents: ContentData[]
}) => (
  <StyledFlex style={{ width: `${window.innerWidth * 0.2}px` }}>
    {matchingContents.map((content, index) => (
      <Content
        key={`content-${content.key}`}
        buffer={buffer}
        content={content}
        isSelected={index === selectedContentIndex}
      />
    ))}
  </StyledFlex>
)

const StyledFlex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: fit-content;
`

export default React.memo(Contents)
