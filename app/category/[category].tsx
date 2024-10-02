import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
import  Card  from '@/components/Reuseables/Card'
import UseFetch from '@/components/utils/Hooks/UseFetch'

const category = () => {
  const {category} = useLocalSearchParams()
  const cate = category.toString()
  const { data, isLoading, } = UseFetch({params:{search: cate}, query: cate})
  
  return (
    <SafeAreaView className='h-full'>
      <View className='min-h-[90vh] w-full items-center py-5'>
        {isLoading ? 
          <View className='flex-1 items-center justify-center'>
            <SolidRoundSpinner className='border-green-400'/>
          </View> :
        <FlatList
          data={data}
          keyExtractor={(data)=> data.id}
          renderItem={(data)=>(
            <Card data={data.item} cate = {cate} wrapperStyle='w-[95%] mx-auto my-3'/>
          )}
          showsVerticalScrollIndicator={false}
        />
        }
      </View>
    </SafeAreaView>
   
  )
}

export default React.memo(category)

const styles = StyleSheet.create({})