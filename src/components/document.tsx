import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Document({ children }: Props) {
  return <div style={{ width: '100%', height: '100%' }}>{children}</div>
}

export default Document
