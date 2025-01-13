import React from 'react'
import { Dimensions, Image, View } from 'react-native'
import ThemeText from '../Reuseables/ThemeText'
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
 interface card {
  data: wishList
 }

const Card = ({data}: card) => {
    const screenWidth = Dimensions.get('window').width; 
    const calculatedWidth = screenWidth - 160; // 9rem = 144px
  return (
    <View className='mb-5 flex-row items-center justify-between'>
      <View className='w-32 h-24 mr-3'>
        <Image source={{uri:data?.img_3}} alt={data?.title} 
        resizeMode="cover" 
        className='w-full h-full rounded-2xl'/>
      </View>
      <View style={{ width: calculatedWidth}} className="ml-auto p-1">
        <ThemeText className='text-lg font-monserrat-semiBold mb-4'>{data.title}</ThemeText>
        <View className='flex-row items-center justify-between'>
          <ThemeText className='text-lg font-medium text-gray-500'>{data.price}</ThemeText>
          <View className='flex-row items-center'>
            <Ionicons name='star' size={22} color="gold"/>
            <ThemeText className='ml-1'>{data.price}</ThemeText>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Card