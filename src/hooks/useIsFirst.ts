import { useEffect, useState } from 'react'

function useIsFirst() {
  const [isFirst, setIsFirst] = useState(true)

  useEffect(() => {
    if (isFirst) setIsFirst(false)
  }, [isFirst])
  return isFirst
}

export default useIsFirst
