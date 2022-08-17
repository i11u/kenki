import { RefObject, useEffect } from 'react'

function useOnResizeEffect(rowNum: number, refObject: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const handleOnResize = () => {
      const pageDOM = document.getElementById('page') as HTMLDivElement
      pageDOM.style.fontSize = `${pageDOM.clientHeight / rowNum - 5}px`
      pageDOM.style.lineHeight = `${pageDOM.clientHeight / rowNum}px`
    }
    const resizeObserver = new ResizeObserver(() => handleOnResize())
    resizeObserver.observe(refObject.current as HTMLDivElement)
  }, [refObject, rowNum])
}

export default useOnResizeEffect
