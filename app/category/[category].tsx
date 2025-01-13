import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useCallback,  useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
import Card from '@/components/Reuseables/Card'
import UseFetch from '@/components/utils/Hooks/UseFetch'
import usePagination from '@/components/Reuseables/usePagination'
import Pagination from '@/components/Reuseables/Pagination'


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

  )
}

export default React.memo(Category)

const styles = StyleSheet.create({})
