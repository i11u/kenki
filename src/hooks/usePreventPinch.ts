import { RefObject, useEffect } from 'react'

function usePreventPinch(dom: RefObject<HTMLDivElement>) {
  useEffect(() => {
    dom.current?.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
        }
      },
      { passive: false }
    )
  }, [dom])
}

export default usePreventPinch
