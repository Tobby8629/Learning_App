import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { instantFetch, newData } from '../data'
import { useQuery } from '@tanstack/react-query'
interface Fetch {
 params?: {}
 query: string,
 more?: string 
}

const UseFetch = ({params, query, more}: Fetch) => {
  const [data, setdata] = useState<fetchData[]>([])
  const {data: initial, isLoading, error, refetch} = useQuery({
    queryKey: [query],
    queryFn: () => {
      let result
       more ? 
      result = instantFetch(`/courses/${more}`): 
      result = instantFetch("/courses", params)
      return result
    },
    enabled: true
  })

  useEffect(()=>{
    if(initial){
      setdata(newData(initial.results))
    }
  },[initial])

  return {
    data,
    setdata,
    isLoading,
    error,
    refetch
  }
}

export default UseFetch

