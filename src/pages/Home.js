import { useState, useEffect } from 'react'
import Products from '../components/Products'
import useQuery from '../hooks/useQuery'

const Home = () => {
  const [products, setProducts] = useState([])

  const { data, loading, error } = useQuery('/products')

  useEffect(() => {
    if(data) setProducts(data.products)
  }, [data])

  return(
    <main>
      <Products products={products} />
      { loading && <h2>Loading...</h2> }
      { error && <h2>{error}</h2> }
    </main>
  )
}

export default Home;