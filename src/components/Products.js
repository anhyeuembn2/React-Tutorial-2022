import React, { useRef } from 'react'
import ProductsCard from './ProductsCard'

const Products = React.memo(({ products }) => {
  const ref = useRef(0)

  return (
    <div className='products'>
      <h2>Renders: {ref.current++}</h2>
      {
        products.map(product => (
          <ProductsCard key={product._id} product={product} />
        ))
      }
    </div>
  )
})

export default Products