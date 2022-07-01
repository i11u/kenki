import styled from 'styled-components'
import { ReactNode } from 'react'
import { PAGE_HEIGHT, PAGE_WIDTH } from '../constants/pageSize'

type Props = {
  children: ReactNode
}

function Page({ children }: Props) {
  return <StyledPage>{children}</StyledPage>
}

const StyledPage = styled.div`
  width: ${`${PAGE_WIDTH + 1}px`};
  height: ${`${PAGE_HEIGHT + 1}px`};
  background-color: #ffffff;
  margin-left: 50vw;
  margin-top: calc(50vh - ${PAGE_HEIGHT / 2}px);
  transform: translateX(-50%);
  box-shadow: 5px 5px 10px darkgrey, -1px 0 10px darkgrey;
`

export default Page
