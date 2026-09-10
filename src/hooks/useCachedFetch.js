// src/hooks/useCachedFetch.js
import { useState, useEffect, useCallback } from 'react';
import { fetchURL } from '../utils/fetchURL';

export function useCachedFetch(cacheKey, endpoint, ttlMinutes = 15) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (bypassCache = false) => {
    setLoading(true);
    setError(null);

    const cached = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(`${cacheKey}_time`);
    const now = new Date().getTime();
    const ttlMs = ttlMinutes * 60 * 1000;

    if (!bypassCache && cached && cachedTime && now - parseInt(cachedTime, 10) < ttlMs) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    try {
      // Defer to centralized fetchURL utility using the Netlify function proxy
      const result = await fetchURL(endpoint);
      localStorage.setItem(cacheKey, JSON.stringify(result));
      localStorage.setItem(`${cacheKey}_time`, now.toString());
      setData(result);
    } catch (err) {
      setError(err);
      // Fallback to stale cache if network fails
      if (cached) {
        setData(JSON.parse(cached));
      }
    } finally {
      setLoading(false);
    }
  }, [cacheKey, endpoint, ttlMinutes]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCache = () => {
    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}_time`);
    fetchData(true);
  };

  return { data, loading, error, clearCache };
}