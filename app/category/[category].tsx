// import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React, { RefObject, useEffect, useRef, useState } from 'react'
// import { useLocalSearchParams } from 'expo-router'
// import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
// import  Card  from '@/components/Reuseables/Card'
// import UseFetch from '@/components/utils/Hooks/UseFetch'
// import usePagination from '@/components/Reuseables/usePagination'
// import Pagination from '@/components/Reuseables/Pagination'
// import { CourseContext } from '@/components/course/Context'
// import ThemeText from '@/components/Reuseables/ThemeText'

// const category = () => {
//   const {category} = useLocalSearchParams()
//   const cate = category.toString()
//   const [page, setpage] = useState("1")
//   const [pagesize, setpagesize] = useState(14)
//   const { data, isLoading, refetch } = UseFetch({params:{search: cate, page: page, pageSize: pagesize }, query: cate})
//   const {total, loading} = usePagination({data, refetch, page, pagesize})
//   const scrollRef = useRef<FlatList>(null)

//   return (
//       <SafeAreaView className='h-full'>
//          <CourseContext.Provider value={{scrollRef}}>
//         <View className='min-h-[90vh] w-full items-center py-5 flex-1'>
//           {isLoading || loading ? 
//             <View className='flex-1 items-center justify-center'>
//               <SolidRoundSpinner className='border-green-400'/>
//             </View> :
//             <View className='flex-1 h-full '>
//               <FlatList
//                 data={data?.results}
//                 keyExtractor={(data)=> data.id}
//                 renderItem={(data)=>(
//                   <Card data={data.item} cate = {cate} wrapperStyle='w-[95%] mx-auto my-3'/>
//                 )}
//                 showsVerticalScrollIndicator={false}
//                 ref={scrollRef}
//               />

//               <View className='px-3'>
//                 <Pagination total={total} page={page} setpage={setpage} scrollType="flatlist" />
//               </View>
             
//             </View>
//           }
//         </View>
//         </CourseContext.Provider>
//       </SafeAreaView>
    
    
   
//   )
// }

// export default React.memo(category)

// const styles = StyleSheet.create({})












import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
import Card from '@/components/Reuseables/Card'
import UseFetch from '@/components/utils/Hooks/UseFetch'
import usePagination from '@/components/Reuseables/usePagination'
import Pagination from '@/components/Reuseables/Pagination'
import { CourseContext } from '@/components/course/Context'
import ThemeText from '@/components/Reuseables/ThemeText'

const Category = () => {
  const { category } = useLocalSearchParams()
  const cate = category.toString()
  const [page, setPage] = useState("1")
  const [pagesize, setPagesize] = useState(14)
  const { data, isLoading, refetch } = UseFetch({
    params: { search: cate, page: page, pageSize: pagesize },
    query: cate
  })
  const { total, loading } = usePagination({ data, refetch, page, pagesize })
  
  const renderItem = useCallback(({ item }: any) => {
    return <Card data={item} cate={cate} page={page} pagesize={pagesize} wrapperStyle='w-[95%] mx-auto my-3' />
  }, [cate,page])

  const getItemLayout = (data:any, index:any) => ({
    length: 200,
    offset: 200 * index,
    index,
  })

  return (
    <CourseContext.Provider value={{data, isLoading}}>
      <SafeAreaView className='h-full'>
        <View className='min-h-[90vh] w-full items-center py-5 flex-1'>
          {isLoading || loading ? (
            <View className='flex-1 items-center justify-center'>
              <SolidRoundSpinner className='border-green-400' />
            </View>
          ) : (
            <View className='flex-1 h-full'>
              <FlatList
                data={data?.results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem} 
                showsVerticalScrollIndicator={false}
                // ref={scrollRef}
                // getItemLayout={getItemLayout}
                initialNumToRender={10} 
                windowSize={5} 
              />

              <View className='px-3'>
                <Pagination total={total} page={page} setpage={setPage} scrollType="flatlist" />
              </View>
            </View>
          )}
        </View>
    </SafeAreaView>
    </CourseContext.Provider>
  )
}

export default React.memo(Category)

const styles = StyleSheet.create({})
