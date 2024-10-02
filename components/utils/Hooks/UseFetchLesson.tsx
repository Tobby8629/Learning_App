import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { instantFetch, lessonData} from '../data'

interface Lesson {
  query: string
  more: string
  params?: {}
}

const UseFetchLesson = ({query, more, params}: Lesson) => {
  const [data, setdata] = useState<lessonFetch>()
    const {data: initial, isLoading, error, refetch} = useQuery({
      queryKey: [query],
      queryFn: () => {
        let result
        result = instantFetch(`/courses/${more}`, params)
        return result
      },
      enabled: true
    })
  
    useEffect(()=>{
      if(initial){
        setdata({total:initial?.count, courses:lessonData(initial.results)})
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

export default UseFetchLesson

const styles = StyleSheet.create({})