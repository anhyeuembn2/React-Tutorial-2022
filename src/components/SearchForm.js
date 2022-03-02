import React,  { useRef } from 'react'

let count = 0;

const SearchForm = () => {
  const ref = useRef(0)
  const inputRef = useRef()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = inputRef.current.value;
    console.log(value)
  }

  return (
    <div className='search_form'>
      <h2>Renders: {ref.current++}</h2>
      <h2>Count: {count++}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef}  />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchForm