import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import UseFetchLesson from '../utils/Hooks/UseFetchLesson'
import ThemeText from '../Reuseables/ThemeText'
import { getChapterNum } from '../utils/data'
import SolidRoundSpinner from '../Reuseables/SolidSpinner'


const Lesson = ({data}: {data: fetchData}) => {
  const [page, setpage] = useState("1")
  const [pageSize, setpageSize] = useState(12) 
  const [total, settotal] = useState(0)
  const {data: courseLesson, refetch, isLoading } = UseFetchLesson(
    {
      query: `${data.id}Lessons`, 
      more: `${data.id}/public-curriculum-items/`,
      params: {
        page: parseInt(page, 10),
        pageSize: pageSize,
      }
   }
  )

  const changepage = useCallback(()=>{
    if(page !== "")
    refetch()
  },[page])

  useEffect(()=>{
    if(courseLesson) {
      const totalpages = parseInt(courseLesson.total)/pageSize
      const tot = Math.floor(totalpages)
      settotal(tot)
    }
    changepage()
  },[page, data])

  return (
    <View>
      {isLoading ? 
        <View className='flex-1 items-center justify-center'>
          <SolidRoundSpinner className='border-green-400' />
        </View> : 
        courseLesson?.courses &&
        courseLesson?.courses?.map((e)=>(
          <View key={e.id} className=''>
            {e.class === "chapter" ?
            <ThemeText className='text-2xl mt-5 font-monserrat-bold'>Chapter {getChapterNum(courseLesson.courses, e.id)}: {e.title}</ThemeText>:
            <View className='mx-3 py-5 mb-2 border-b-[1px] border-[#86efac4a]'>
              <ThemeText className='text-lg font-monserrat-medium '>{e.title}</ThemeText>
            </View>
            }     
          </View>
        ))
      }
      <View>
        <ThemeText>page {page}</ThemeText>
         <TextInput
           value={page} 
           className='w-full border-2 border-green-300 p-2 text-white'
           onChangeText={ (value)=> setpage(value)}
         />
         {/* {
          total && 
          <ThemeText> of {total}</ThemeText>
         } */}
        
      </View>
    </View>
  )
}

export default React.memo(Lesson)

const styles = StyleSheet.create({})