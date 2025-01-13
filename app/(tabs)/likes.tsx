import { ScrollView, View } from 'react-native'
import React from 'react'
import ThemeText from '@/components/Reuseables/ThemeText'

const likes = () => {
  return (
    <View className='pt-20 h-full'>
      <ScrollView className='flex-1' >
        <View className='items-center justify-center'>
          <ThemeText className='text-3xl font-monserrat-bold'>Likes</ThemeText>
        </View>
      </ScrollView>
    </View>
  )
}

export default likes

