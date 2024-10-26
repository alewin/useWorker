import { dequal } from 'dequal'
import React, { DependencyList } from 'react'

export const useDeepCallback = <T extends (...args: any[]) => any>(
  callback: T,
  dependencies: DependencyList,
) => {
  const prevDependencies = React.useRef<DependencyList>(dependencies)
  const areDeepsEqual = dequal(prevDependencies.current, dependencies)
  if (!areDeepsEqual) {
    prevDependencies.current = dependencies
  }

  return React.useCallback(callback, prevDependencies.current)
}
