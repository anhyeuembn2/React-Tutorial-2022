import { useState} from 'react'

const Home = ({ name = "Anh", age, children }) => {
  const [products, setProducts] = useState(1)

  return(
    <div>
      <div>Name: {name}</div>
      <div>Age: {age}</div>
      <div>Home: {children}</div>
      <h1>{products}</h1>
      <button onClick={() => {
        let products = "A"
        setProducts(prev => prev + 1)
        // console.log(products)
      }
      }>Click</button>
    </div>
  )
}

export default Home;