import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const usePagination = (totalPages, page) => {
  const navigate = useNavigate()

  const { firstArr, lastArr } = useMemo(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1)

    if(totalPages < 4)
      return {
        firstArr: newArr,
        lastArr: []
      }

    if(totalPages - page >= 4){
      return {
        firstArr: newArr.slice(page - 1, page + 2),
        lastArr: newArr.slice(totalPages - 1)
      }
    }else{
      return {
        firstArr: newArr.slice(totalPages - 4, totalPages),
        lastArr: []
      }
    }
  }, [totalPages, page])

  

  const isActive = (index) => {
    if(index === page) return "active"
    return ""
  }

  const prev = () => {
    const newPage = Math.max(page - 1, 1)
    navigate(`?page=${newPage}`)
  }

  const next = () => {
    const newPage = Math.min(page + 1, totalPages)
    navigate(`?page=${newPage}`)
  }

  const jump = (num) => {
    navigate(`?page=${num}`)
  }

  return { firstArr, lastArr, navigate, isActive, prev, next, jump }
}

export default usePagination