import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useMyContext } from '../context/store'

const useQuery = (url) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { cache } = useMyContext()

  useEffect(() => {
    let here = true;
    if(cache.current[url]){
      setData(cache.current[url])
    }

    if(!cache.current[url]) setLoading(true)

    axios.get(url)
    .then(res => {
      if(!here) return;
      setData(res.data)
      cache.current[url] = res.data;
    })
    .catch(err => {
      if(!here) return;
      setError(err.response.data.msg)
      toast.error(err.response.data.msg)
    })
    .finally(() => {
      if(!here) return;
      setLoading(false)
    })

    return () => {
      here = false;
    }
  }, [url, cache])

  return { data, loading, error }
}

export default useQuery