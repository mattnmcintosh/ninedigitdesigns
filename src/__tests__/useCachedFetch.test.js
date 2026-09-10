import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCachedFetch } from '../hooks/useCachedFetch';

describe('useCachedFetch Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('fetches fresh data and stores it in localStorage when cache is empty', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ id: 1, name: 'Test Art' });
    const key = 'test_cache_key';

    const { result } = renderHook(() => useCachedFetch(key, mockFetch, 10));

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for hook to resolve
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ id: 1, name: 'Test Art' });
    expect(result.current.loading).toBe(false);

    // Verify it was saved to localStorage
    const cachedData = localStorage.getItem(key);
    expect(cachedData).toBeTruthy();
    expect(JSON.parse(cachedData)).toEqual({ id: 1, name: 'Test Art' });
  });

  it('returns cached data without calling fetch if cache is fresh', async () => {
    const key = 'test_cache_key';
    const cachedObject = { id: 2, name: 'Cached Art' };
    
    // Pre-populate localStorage
    localStorage.setItem(key, JSON.stringify(cachedObject));
    localStorage.setItem(`${key}_time`, new Date().getTime().toString());

    const mockFetch = vi.fn().mockResolvedValue({ id: 99, name: 'Should Not Fetch' });

    const { result } = renderHook(() => useCachedFetch(key, mockFetch, 10));

    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });

    // Fetch should NOT have been called because cache is valid
    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.data).toEqual(cachedObject);
    expect(result.current.loading).toBe(false);
  });
});