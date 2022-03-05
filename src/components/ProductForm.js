import axios from 'axios'
import React, { useRef } from 'react'

const ProductForm = ({ btnTxt, data }) => {
  const multiRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const children = multiRef.current.children;

    const newData = [...children].reduce((obj, child) => {
      if(!child.name) return obj;
      return {...obj, [child.name]:child.value}
    }, {})

    if(data){
      const result = shallowEqual(newData, data)
      if(result) return;
      axios.put(`products/${data._id}`, newData)
      .then(res => console.log(res))
    }else{
      axios.post(`products`, newData).then(res => console.log(res))
    }
  }

  function shallowEqual(obj1, obj2) {
    const keys = Object.keys(obj1)

    for(let key of keys){
      if (obj1[key] !== obj2[key]) {
        return false;
      }
      return true;
    }
  }


  return (
    <div className='product_form'>
      <form ref={multiRef} onSubmit={handleSubmit}>
        <input type="text" name="title"
        placeholder="Product title" required
        defaultValue={data?.title}
        />

        <input type="text" name="description"
        placeholder="Product description" required
        defaultValue={data?.description}
        />

        <input type="text" name="price"
        placeholder="Product price" required
        defaultValue={data?.price}
        />

        <input type="text" name="category"
        placeholder="Product category" required
        defaultValue={data?.category}
        />

        <input type="text" name="image"
        placeholder="Product image" required
        defaultValue={data?.image}
        />
        
        <button>
          { btnTxt }
        </button>
      </form>
    </div>
  )
}

export default ProductForm