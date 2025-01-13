import { FlatList, Pressable, ScrollView, useColorScheme, View, VirtualizedList } from 'react-native'
import React, { useContext } from 'react'
import ThemeText from '@/components/Reuseables/ThemeText'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { globalContext } from '@/context/Globalcontext'
import { globally } from '@/components/utils/data'
import UseFetch from '@/components/utils/Hooks/UseFetch'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'
import Card from '@/components/wishLists/Card'
import Empty from '@/components/Reuseables/Empty'
import { router } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const likes = () => {
  const {colors} = useTheme()
  const { user, loading } = useContext(globalContext) as globally
  const getItem = (data: any[], index: number) => data[index];
  const getItemCount = (data: wishList[]) => data.length;
  
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }} className='pt-20 px-5 h-full'>
      <View className='flex-row w-full items-center justify-between mb-10'>
        <Pressable onPress={() => router.back()}>
         <Ionicons name="arrow-back" size={30} color={colors.text}  />
        </Pressable>
        
        <ThemeText className='text-2xl font-monserrat-bold'>Likes</ThemeText>
        <View className=''></View>
      </View>
      {loading ? 
        <View className='flex-1 items-center justify-center'>
          <SolidRoundSpinner className='border-green-400' />
        </View>
        :
        
        <VirtualizedList
          data={user?.wishlist ?? []}
          initialNumToRender={10}
          keyExtractor={(item: wishList) => item?.wish_id?.toString()}
          getItem={getItem}
          getItemCount={getItemCount}
          renderItem={({ item, index }) => <Card data={item} index={index + 1} />}
        />
      }
    </GestureHandlerRootView>
  )
}

export default likes

