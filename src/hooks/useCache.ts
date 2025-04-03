/**
 * cache key for ttl mili-seconds
 * @param ttl in miliseconds
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
