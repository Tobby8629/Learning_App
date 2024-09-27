import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Greeting from '../utils/Greeting'
import { FontAwesome6, Octicons } from '@expo/vector-icons'
import Animated, { FadeInDown, FadeInRight, FadeInUp } from 'react-native-reanimated'
import { router } from 'expo-router'




const Header = () => {
  return (
    <View className='min-h-24 pt-3 px-8 w-full bg-green-300  '>
      <View className='flex-row justify-between items-center'>
        <Animated.View entering={FadeInUp.duration(2000).springify()}>
          <Greeting />
          <Text  className='text-gray-800 font-monserrat-bold text-[23px]'>Tobby</Text>
        </Animated.View>
        <Animated.View entering={FadeInRight.duration(2000).delay(300).springify()}>
          <FontAwesome6 name="bell" size={20}/>
        </Animated.View>
      </View>
      <Animated.View entering={FadeInDown.duration(2000).delay(600).springify()}>
        <Pressable className=' my-6 bg-[#ffffff1a] flex-row items-center gap-2 rounded-lg px-4 h-[50px] w-full border-[.3px] border-gray-[#8080806b]' 
        onPress={()=>router.push("/(tabs)/search")}>
          <View className=' '>
              <Octicons name='search' size={17} />
          </View>
          <Text className='text-[#808080b8] font-monserrat-light capitalize'>what do you want to learn ?</Text>  
        </Pressable>
      </Animated.View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})