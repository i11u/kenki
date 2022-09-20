import React, { RefObject, useEffect } from 'react'
import { PageConfig } from '../jotai-hooks/pageConfig/atom'

const useOnWheelPageEffect = (
  pageRef: RefObject<HTMLDivElement>,
  setPreviousPageConfig: React.Dispatch<React.SetStateAction<PageConfig>>,
  setPageConfig: React.Dispatch<React.SetStateAction<PageConfig>>,
  throttle: (callback: () => void, time: number) => void
) => {
  useEffect(() => {
    pageRef.current?.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault()
          if (e.deltaY < 0) {
            throttle(
              () =>
                setPageConfig((prev: PageConfig) => {
                  if (prev.scale >= 2) return prev
                  setPreviousPageConfig(prev)
                  return { ...prev, scale: prev.scale + 0.02 }
                }),
              0
            )
          } else {
            throttle(
              () =>
                setPageConfig((prev: PageConfig) => {
                  if (prev.scale <= 0.51) return prev
                  setPreviousPageConfig(prev)
                  return { ...prev, scale: prev.scale - 0.02 }
                }),
              0
            )
          }
        }
      },
      { passive: false }
    )
  }, [pageRef, setPreviousPageConfig, setPageConfig, throttle])
}

export default useOnWheelPageEffect
