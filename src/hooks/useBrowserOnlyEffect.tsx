"use client";

import { useEffect } from "react";

export function useBrowserOnlyEffect<T extends (...args: any[]) => any>(
  effectFn: T,
  dependencies: React.DependencyList
) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (typeof effectFn === "function") {
        return effectFn();
      }
    }
  }, dependencies);
}
