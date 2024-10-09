import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import UseFetchLesson from '../utils/Hooks/UseFetchLesson'
import { ReviewData, swish } from '../utils/data'
import ThemeText from '../Reuseables/ThemeText'
import { FontAwesome } from '@expo/vector-icons'
import SolidRoundSpinner from '../Reuseables/SolidSpinner'

interface lesson{
  data: fetchData,
}

interface Reviews {
  count: number
  results: Review[]
}

const Review = ({data}:lesson ) => {
  const [page, setpage] = useState(1)
  const [ total, settotal] = useState(0)
  const [loading, setloading] = useState(false)
  const pagesize = 10
  const [reviews, setreviews] = useState<Reviews>()
  const {data: reviewData, isLoading, error, refetch} = UseFetchLesson(
    {
      query: `reviewCourse${data.id}`,
      more: `${data.id}/reviews/`,
      params: {page: page, pageSize: pagesize}
    }
  )
  const switchtab = (tab: keyof typeof swish) => {
    if (tab === "prev") {
      setpage((prev) => prev - 1)
    }
    if (tab === "next") {
      setpage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    if (reviewData && reviewData?.results) {
      setreviews({results: ReviewData(reviewData?.results), count: reviewData?.count})
      settotal(Math.floor(reviewData?.count / pagesize))
    }
  }, [reviewData])

  useEffect(()=>{
    setloading(true)
    refetch()
    setTimeout(() => {
      setloading(false) 
    }, 1000);
    
  }, [page])

  
  return (
    <View>
      {isLoading || loading? 
        <View className='flex-1 items-center justify-center'>
          <SolidRoundSpinner className='border-green-400' />
        </View> : 
        <>
          <ThemeText className='text-3xl text-gray-600 py-4 font-monserrat-bold'>Course Reviews: {reviews?.count}</ThemeText>
          {reviews && 
            reviews?.results?.map((e)=>(
              <View key={e.id.toString()} className='flex-row p-2 py-4 w-full justify-between border-t-[1px] border-gray-400 items-start'>
                <View>
                  <ThemeText className='font-monserrat-bold text-xl text-gray'>{e.user.display_name}</ThemeText>
                  <ThemeText className='font-monserrat-medium my-2 text-slate-400'>{e.created}</ThemeText>
                  {e?.content ?
                    <ThemeText className='font-monserrat-italic text-slate-400 leading-7 text-base'>{ e.content}</ThemeText>:
                    <ThemeText className='font-monserrat-italic text-slate-400'>No comment</ThemeText>
                  } 
                </View>
                <View className='flex-row items-center'>
                  {Array.from({ length: e.rating }, (_, index) => (
                    <FontAwesome name="star" size={18} color={"gold"} key={index.toString()}/>
                  ))}
                  {!Number.isInteger(e?.rating) &&
                      <FontAwesome name="star-half-full" size={18} color={"gold"}/> 
                  }
                  <ThemeText className='ml-2 font-monserrat-semiBold text-lg'>{e.rating}</ThemeText>
                </View>
              </View>
            ))
          }
          <View className='flex-row justify-between items-center w-full mt-8'>
            <Pressable disabled={page <= 1} onPress={() => switchtab("prev")} className='items-center'>
              <FontAwesome name="angle-double-left" size={30} color={page <= 1 ? "#9ca3af" : "#4ade80"} />
              <ThemeText className='mt-1 text-xl font-monserrat-semiBold' style={ page <= 1 ? {color: "#9ca3af"} : {color:"#4ade80"}}>Prev</ThemeText>
            </Pressable>

            <Pressable  onPress={() => switchtab("next")} className='items-center ml-14'>
              <FontAwesome name="angle-double-right" size={30} color={page === total ? "#9ca3af" : "#4ade80"} />
              <ThemeText style={page === total ? {color: "#9ca3af"} : {color:"#4ade80"}} className='mt-1 text-xl font-monserrat-semiBold'>Next</ThemeText>
            </Pressable>
          </View>
        </>
      }      
    </View>
  )
}

export default React.memo(Review)

const styles = StyleSheet.create({})