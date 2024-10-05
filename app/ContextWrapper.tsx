import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CourseContext } from '@/components/course/Context'
import UseFetch from '@/components/utils/Hooks/UseFetch'
import { Stack } from 'expo-router'

const ContextWrapper = () => {
  const {data, isLoading, error} = UseFetch({query: "homeFetch"})
  return (
   <CourseContext.Provider value={{data,isLoading,error}}>
      <Stack screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="course/[course]" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
   </CourseContext.Provider>
      
    
  )
}

export default ContextWrapper

const styles = StyleSheet.create({})