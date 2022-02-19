import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductInfo from '../components/ProductInfo'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState()


  useEffect(() => {
    // do your side effect here..
    let here = true;
    console.log('didmount')
    axios.get(`/products/${id}`)
    .then(res => {
      console.log('did unmout')
      console.log(here)
      if(!here) return;
      setProduct(res.data)
    })

    return () => {
      // clean up here...
      // Executed before the next render or unmount
      here = false
      console.log('unmount')
    }
  }, [product])

  console.log('mounting')



  return (
    <main>
      { product && <ProductInfo product={product} /> }
      { console.log('mount') }
      <button onClick={() => setProduct(prev => prev + 1)}>click</button>
    </main>
  )
}

export default ProductDetail