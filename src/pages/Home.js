import { useState, useEffect, useMemo, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import Pagination from '../components/Pagination'
import Products from '../components/Products'
import useQuery from '../hooks/useQuery'

const Home = () => {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)

  const { search } = useLocation()
  const ref = useRef(0)

  const page = useMemo(() => {
    const page = new URLSearchParams(search).get('page') || 1;
    return Number(page);
  }, [search])

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



  return(
    <main>
      <h2>Renders: {ref.current++}</h2>
      <Products products={products} />
      { loading && <h2>Loading...</h2> }
      { error && <h2>{error}</h2> }
      <Pagination totalPages={totalPages} page={page} />
    </main>
  )
}

export default Home;