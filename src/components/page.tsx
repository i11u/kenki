import React from 'react'
import styled from 'styled-components'
import { aspectRatioValue, PageConfig, pageConfigSelectors } from '../states/page'
import { PageUtil } from '../utils/page'
import { blocksActions, blocksSelectors } from '../states/block'
import BlocksJSX from './blocks'
import GridJSX from './grid'

function Page() {
  const pageConfig = pageConfigSelectors.usePageConfigSelector()
  const id = blocksSelectors.useEditingBlockId()
  const changeBlockStatus = blocksActions.useChangeBlockStatus()
  const changeBlockPosition = blocksActions.useChangeBlockPosition()
  const addBlock = blocksActions.useAddBlock()
  const gridNum = pageConfigSelectors.useGridNumSelector()

  return (
    <StyledPage
      id="page"
      pageConfig={pageConfig}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
        PageUtil.handleOnMouseDown({
          e,
          gridNum,
          id,
          changeBlockStatus,
          changeBlockPosition,
          addBlock,
        })
      }
    >
      <GridJSX />
      <BlocksJSX />
    </StyledPage>
  )
}

const StyledPage = styled.div<{ pageConfig: PageConfig }>`
  width: ${(props) => (props.pageConfig.aspectRatio === 'full-screen' ? '95%' : '90%')};
  aspect-ratio: ${(props) =>
    props.pageConfig.aspectRatio === 'full-screen'
      ? ''
      : 1 / PageUtil.getAspectRatio(aspectRatioValue(props.pageConfig.aspectRatio))};
  height: ${(props) => (props.pageConfig.aspectRatio === 'full-screen' ? '95%' : '')};
  background-color: #ffffff;
  margin-left: 50vw;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 5px 5px 10px darkgrey, -1px 0 10px darkgrey;
  position: absolute;
`

export default Page
