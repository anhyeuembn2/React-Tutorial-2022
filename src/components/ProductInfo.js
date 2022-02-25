import React, { useRef } from 'react'

const ProductInfo = ({product}) => {
  const ref = useRef(0)

  return (
    <div className='product_info'>
      <h2>Renders: {ref.current++}</h2>
      <img src={product.image} alt={product.image} />
      <div className='box'>
        <h2>{product.title}</h2>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
        <h4>Category: {product.category}</h4>
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductInfo