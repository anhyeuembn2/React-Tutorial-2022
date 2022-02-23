import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import Pagination from '../components/Pagination'
import Products from '../components/Products'
import useQuery from '../hooks/useQuery'

const Home = () => {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)

  const { search } = useLocation()


  const { data, loading, error } = useQuery(
    `/products?limit=${limit}&page=${page}`
  )

  useEffect(() => {
    if(data?.products) setProducts(data.products)
  }, [data?.products])

  const totalPages = useMemo(() => {
    if(!data?.count) return 0;
    return Math.ceil(data.count / limit)
  }, [data?.count])

  useEffect(() => {
    const page = new URLSearchParams(search).get('page') || 1;
    setPage(Number(page))
  }, [search])


  return(
    <main>
      <Products products={products} />
      { loading && <h2>Loading...</h2> }
      { error && <h2>{error}</h2> }
      <Pagination totalPages={totalPages} page={page} />
    </main>
  )
}

export default Home;