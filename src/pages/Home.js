import { useState, useEffect } from 'react'
import axios from 'axios'
import Products from '../components/Products'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/products').then(res => {
      setProducts(res.data.products)
    })
  }, [])

  return(
    <div>
      <Products products={products} />
    </div>
  )
}

export default Home;