import React, { DependencyList } from 'react'
import dequal from 'dequal'

export const useDeepCallback = (callback: any, dependencies: DependencyList) => {
  const prevDependencies = React.useRef<DependencyList>(dependencies)
  const areDeepsEqual = dequal(prevDependencies.current, dependencies)
  if (!areDeepsEqual) {
    prevDependencies.current = dependencies
  }

  return React.useCallback(callback, prevDependencies.current)
}
