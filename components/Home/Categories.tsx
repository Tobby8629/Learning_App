import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { categories } from '../utils/data'
import { FontAwesome6 } from '@expo/vector-icons'
import Animated, { FadeIn } from 'react-native-reanimated'
import { router } from 'expo-router'
import ThemeText from '../Reuseables/ThemeText'

const Categories = () => {
  const [current, setcurrent] = useState<Category[] | undefined>()
  const [view, setview] = useState(false)
  
  useEffect(() => {
    const handleCategoryChange = (categories: Category[]) => {
      if (view) {
        setcurrent(categories);
      } else {
        setcurrent(categories.slice(0, 4));
      }
    };
    
    if (categories) {
      handleCategoryChange(categories);
    }
  }, [view, categories]); 
  
  return (
    <View className='my-3 w-full'>
      <View className=' flex-row justify-between my-2 items-center'> 
        <ThemeText className=' font-monserrat-bold text-gray-800 text-xl'>Explore Topics</ThemeText>
        {view ? 
          <TouchableOpacity onPress={()=>setview(false)}>
            <Text className=' text-base font-monserrat-semiBold text-green-400'>See Less</Text>
          </TouchableOpacity>:
          <TouchableOpacity onPress={()=>setview(true)}>
            <Text className=' text-base font-monserrat-semiBold text-green-400'>See More</Text>
          </TouchableOpacity>
        }   
      </View>
      <Animated.View key={view ? 'viewTrue' : 'viewFalse'}entering={FadeIn.duration(300).delay(100)}>
        <View className='flex-row justify-between items-center flex-wrap gap-2 px-1 py-2'>
          {current?.map((e)=>(
            <TouchableOpacity className='w-[20%] items-center' key={e.id} onPress={()=> router.push(`/category/${e.id}`)}>
              <View className=' w-16 h-16 justify-center items-center rounded-full border-[0.5px] border-green-400'>
                <FontAwesome6 name={e.icon} size={23} color="#808080c9"/>
              </View>
              <ThemeText className='text-center font-monserrat-medium text-sm my-2 '>{e.abbrv}</ThemeText>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  )
}

export default Categories
