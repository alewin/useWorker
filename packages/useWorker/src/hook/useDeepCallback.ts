import React, { DependencyList } from "react";
import { dequal } from "dequal";

// eslint-disable-next-line no-unused-vars
export const useDeepCallback = <T extends (...args: any[]) => any>(callback: T, dependencies: DependencyList) => {
  const prevDependencies = React.useRef<DependencyList>(dependencies);
  const areDeepsEqual = dequal(prevDependencies.current, dependencies);
  if (!areDeepsEqual) {
    prevDependencies.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(callback, prevDependencies.current);
};
