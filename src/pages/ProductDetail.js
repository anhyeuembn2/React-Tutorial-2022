import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ProductInfo from '../components/ProductInfo'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState()

  useEffect(() => {
    axios.get(`/products/${id}`)
    .then(res => setProduct(res.data))
  }, [id])


  return (
    <main>
      { product && <ProductInfo product={product} /> }
    </main>
  )
}

export default ProductDetail