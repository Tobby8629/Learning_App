import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { instantFetch, newData } from '../data'
import { useQuery } from '@tanstack/react-query'
interface Fetch {
 params?: {}
 query: string,
 more?: string 
}

interface updateFetch {
  total: string,
  results: fetchData[]
}

const UseFetch = ({params, query, more}: Fetch) => {
  const [data, setdata] = useState<updateFetch>()
  const {data: initial, isLoading, error, refetch} = useQuery({
    queryKey: [query],
    queryFn: () => {
      let result
       more ? 
      result = instantFetch(`/courses/${more}`, params): 
      result = instantFetch("/courses/", params)
      return result
    },
    enabled: true
  })

  useEffect(()=>{
    if(initial){
      setdata({total: initial.count, results: newData(initial.results)})
    }
  },[initial])

  const handleRefetch = async () => {
    const updatedData = await refetch();
    if (updatedData.data) {
      setdata({
        total: updatedData.data.count,
        results: newData(updatedData.data.results)
      })
    }
  }

  return {
    data,
    setdata,
    isLoading,
    error,
    refetch: handleRefetch
  }
}

export default UseFetch

