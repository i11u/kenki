import styled from 'styled-components'
import { ReactNode } from 'react'

type Props = { children: ReactNode }

function Background({ children }: Props) {
  return <StyledBackground>{children}</StyledBackground>
}

const StyledBackground = styled.div`
  background-color: rgb(226, 226, 226);
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

export default Background
