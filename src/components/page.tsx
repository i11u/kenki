import React, { useEffect } from 'react'
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

  useEffect(() => {
    document.getElementById('page')!.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) {
          console.log('aaa')
        }
      },
      { passive: false }
    )
  }, [])

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
  min-width: 960px;
  width: ${(props) => (props.pageConfig.aspectRatio === 'full-screen' ? '95%' : '85%')};
  aspect-ratio: ${(props) =>
    props.pageConfig.aspectRatio === 'full-screen'
      ? ''
      : 1 / PageUtil.getAspectRatio(aspectRatioValue(props.pageConfig.aspectRatio))};
  background-color: #ffffff;
  margin: ${(props) => (props.pageConfig.aspectRatio === 'vertical' ? '3% auto' : '')};
  top: ${(props) => (props.pageConfig.aspectRatio === 'slide' ? '50%' : '')};
  margin-left: ${(props) => (props.pageConfig.aspectRatio === 'slide' ? '50%' : '')};
  transform: ${(props) => (props.pageConfig.aspectRatio === 'slide' ? 'translate(-50%, -50%)' : '')};
  box-shadow: 5px 5px 10px darkgrey, -1px 0 10px darkgrey;
  position: relative;
`

export default Page
