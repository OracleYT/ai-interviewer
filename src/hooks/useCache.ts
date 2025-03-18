/**
 * cache key for ttl seconds
 * @param ttl in seconds
 * @returns { addKey, hasKey };
 */
function useCache(ttl: number) {
  const cache = new Set();
  const hasKey = (key: string) => {
    return cache.has(key);
  };
  const addKey = (key: string) => {
    cache.add(key);
    setTimeout(() => {
      cache.delete(key);
    }, ttl);
  };
  return {
    addKey,
    hasKey,
  };
}

export default useCache;
