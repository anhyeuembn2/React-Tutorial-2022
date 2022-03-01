import React, { useState } from 'react'
import Modal from './Modal'
import SearchForm from './SearchForm'
import FilterForm from './FilterForm'

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openFilter, setOpenFilter] = useState(false)


  return (
    <header>
      <nav>
        <p>Home</p>
        <p>Create Product</p>
        <p onClick={() => setOpenSearch(true)}>Search</p>
        <p onClick={() => setOpenFilter(true)}>Filter</p>
      </nav>

{/* -------- Search --------- */}
      {
        openSearch &&
        <Modal titleTxt="Search" setOpen={setOpenSearch}>
          <SearchForm />
        </Modal>
      }
      
{/* -------- Filter --------- */}
      {
        openFilter &&
        <Modal titleTxt="Filter" setOpen={setOpenFilter}>
          <FilterForm />
        </Modal>
      }
       
    </header>
  )
}

export default Header