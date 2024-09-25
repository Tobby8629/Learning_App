import { Alert, Image, Pressable, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import { instantFetch, newData } from '@/components/utils/data'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
import search from '../(tabs)/search'
import ThemeText from '@/components/Reuseables/ThemeText'

const course = () => {
  const {course} = useLocalSearchParams()
  const [ update, setupdate] = useState<fetchData>()
  const { data, isLoading, error, refetch} = useQuery({
    queryKey: ["fethcourse", course],
    queryFn: () => instantFetch(`/courses`) 
  })
  const colorScheme = useColorScheme()
  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: `Check Out ${data?.title} https://www.udemy.com/api-2.0/courses/${course}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via: ${result.activityType}`);
        } else {
          console.log('Content shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
       
        console.log('Share dialog dismissed');
      }
      
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  useEffect(()=>{
    if(data){
      console.log(data.results[0]?.curriculum_items)
      const update = newData(data.results).find((e:any)=>e.id == course)
      setupdate(update)
    }
  },[data])
 
  return (
    <SafeAreaView className='h-full'>
      <View className='flex-row justify-between px-6 py-3'>
        <Pressable onPress={()=> router.back()}>
          <FontAwesome6 name="arrow-left" size={20} color={colorScheme === "dark" ? "#86efac" : "#374151" }/>
        </Pressable>
        <TouchableOpacity onPress={shareLink}>
          <FontAwesome6 name="share" size={20} color={colorScheme === "dark" ? "#86efac" : "#374151" }/>
        </TouchableOpacity>
      </View>
      {
        isLoading ?
        <View className='flex-1 items-center justify-center'>
          <SolidRoundSpinner className='border-green-400'/>
        </View>
         :
        <ScrollView className='px-6 my-5'> 
          <View>
            <Image 
              source={{uri: update?.img3}}
              className='w-full h-64 rounded-lg'
               
            />
            <ThemeText className=' text-2xl font-monserrat-semiBold my-2'>{update?.title.replace(/!/g, "")}</ThemeText>
          </View>
          <View>
            <Pressable>
              <ThemeText>About</ThemeText>
            </Pressable>
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  )
}

export default course

const styles = StyleSheet.create({})