import { useCallback } from 'react'

function useThrottleCallback() {
  let throttlePause: boolean
  return useCallback((callback: () => void, time: number) => {
    // don't run the function if throttlePause is true
    if (throttlePause) return

    // set throttlePause to true after the if condition. This allows the function to be run once
    // eslint-disable-next-line react-hooks/exhaustive-deps,no-param-reassign
    throttlePause = true

    // setTimeout runs the callback within the specified time
    setTimeout(() => {
      callback()

      // throttlePause is set to false once the function has been called, allowing the throttle function to loop
      // eslint-disable-next-line no-param-reassign
      throttlePause = false
    }, time)
  }, [])
}

export default useThrottleCallback
