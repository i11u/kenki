import React from 'react'
import styled from 'styled-components'
import Content from './content'
import { ContentData } from './sidebarLeft'

const Contents = ({
  buffer,
  selectedContentIndex,
  matchingContents,
}: {
  buffer: string
  selectedContentIndex: number
  matchingContents: ContentData[]
}) => (
  <StyledFlex style={{ width: `calc(${window.innerWidth * 0.2}px - 0.5px)` }}>
    {matchingContents.map((content, index) => (
      <Content
        // eslint-disable-next-line react/no-array-index-key
        key={`content-${index}`}
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
  height: 80px;
`

export default React.memo(Contents)
