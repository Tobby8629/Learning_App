import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import UseFetchLesson from '../utils/Hooks/UseFetchLesson'
import ThemeText from '../Reuseables/ThemeText'
import { getChapterNum } from '../utils/data'
import SolidRoundSpinner from '../Reuseables/SolidSpinner'
import Pagination from '../Reuseables/Pagination'
import usePagination from '../Reuseables/usePagination'


interface lesson{
  data: fetchData,
}

const Lesson = ({data}: lesson) => {
  const [page, setpage] = useState("1")
  const [pagesize, setpagesize] = useState(12)
  const {data: courseLesson, refetch, isLoading } = UseFetchLesson(
    {
      query: `${data.id}Lessons`, 
      more: `${data.id}/public-curriculum-items/`,
      params: {
        page: parseInt(page, 10),
        pageSize: pagesize,
      }
   }
  )
  const {loading, total} = usePagination({data: courseLesson, page, pagesize, refetch})
  
  

  return (
    <View>
      {isLoading || loading ? 
        <View className='flex-1 items-center justify-center'>
          <SolidRoundSpinner className='border-green-400' />
        </View> : 
        <>
          <View>
            {
              courseLesson?.courses &&
              courseLesson?.courses?.map((e)=> (
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
          </View>
          <Pagination total={total} setpage={setpage} page={page} scrollType="scrollView" />
        </>
      }
    </View>
  )
}

export default React.memo(Lesson)

const styles = StyleSheet.create({})

