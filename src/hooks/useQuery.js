import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMyContext } from '../context/store'

const DEFAULT_OPTION = { 
  sizeCache: 100,
  saveCache: false,
  refetchInterval: 1000
}

const useQuery = (url, opt) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const option = {...DEFAULT_OPTION, ...opt}
  const { cache } = useMyContext()


  const clearCache = useCallback(() => {
    if(Object.keys(cache.current).length >= option.sizeCache)
    return cache.current = {};
  }, [cache, option.sizeCache])

  const fetchData = useCallback(async(url, here) => {
    if(!cache.current[url]) setLoading(true);

    try {
      const res = await axios.get(url);
      if(!here) return;
      setData(res.data)
      if(option.saveCache) {
        cache.current[url] = res.data
      }
    } catch (err) {
      if(!here) return;
      setError(err.response.data.msg)
      toast.error(err.response.data.msg)
    } finally{
      if(!here) return;
      setLoading(false)
    }
  }, [cache, option.saveCache])


  useEffect(() => {
    let here = true;
    if(cache.current[url]){
      setData(cache.current[url])
    }

    const delayDebounce = setTimeout(() => {
      fetchData(url, here)
    }, cache.current[url] ? option.refetchInterval : 0)

    clearCache()

    return () => {
      here = false
      clearTimeout(delayDebounce)
    }
  }, [url, cache, clearCache, fetchData, option.refetching, option.refetchInterval])

  return { data, loading, error }
}

export default useQuery