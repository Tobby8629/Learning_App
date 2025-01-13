import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

interface pagin {
  data: any
  refetch: () => void
  page: string,
  pagesize: number
}

const usePagination = ({data,refetch, page, pagesize}: pagin) => {
  const [total, settotal] = useState(0)
  const [loading, setloading] = useState(false)

  const changepage = ()=>{
    if(page !== ""){
      setloading(true)
      refetch()
      setTimeout(()=> setloading(false),(1000))     
    }
  }

  useEffect(()=>{
    if(data && data.total) {
      const totalpages = parseInt(data.total, 10)/pagesize
      totalpages < 1 ? settotal(1) : settotal(Math.floor(totalpages))
    }
  },[ data])

  useEffect(()=> changepage(),[page])


  return {
    page,
    loading,
    total
  }
}

export default usePagination

const styles = StyleSheet.create({})