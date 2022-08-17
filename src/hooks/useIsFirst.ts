import { useEffect, useRef } from 'react'

function useIsFirst() {
  const isFirst = useRef(true)
  useEffect(() => {
    if (isFirst.current) isFirst.current = false
  })
  return isFirst.current
}

export default useIsFirst
