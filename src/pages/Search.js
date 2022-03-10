import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useQuery from '../hooks/useQuery'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'

const Search = () => {
  const { value } = useParams()
  const { sort } = useMyContext()

  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [stop, setStop] = useState(false)

  const { data, loading, error } = useQuery(
    `/products?search=${value}&sort=${sort}&limit=${limit}&page=${page}`
  )

  useEffect(() => {
    if(data?.products) {
      setProducts(prev => [...prev, ...data.products])

      if(data.products.length < limit) setStop(true)
    }
  }, [data?.products, limit])

  useEffect(() => {
    setProducts([])
    setPage(1)
    setStop(false)
  }, [value, sort])

  return (
    <>
      <Sorting />
      <Products products={products} />
      { loading && <h2>Loading...</h2> }
      { error && <h2>{error}</h2> }

      <button className="btn-load_more"
      onClick={() => setPage(prev => prev + 1)}
      disabled={stop}
      >
        Load more
      </button>
    </>
  )
}

export default Search