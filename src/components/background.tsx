import styled from 'styled-components'
import { ReactNode } from 'react'

type Props = { children: ReactNode }

function Background({ children }: Props) {
  return <StyledBackground>{children}</StyledBackground>
}

const StyledBackground = styled.div`
  background-color: #f9f9f9;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
`

export default Background
