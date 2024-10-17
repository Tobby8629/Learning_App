import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { CourseContext } from '@/components/course/Context'
import UseFetch from '@/components/utils/Hooks/UseFetch'
import { Redirect, Stack } from 'expo-router'
import Globalcontext, { globalContext } from '@/context/Globalcontext'

const ContextWrapper = () => {
  const {data, isLoading, error} = UseFetch({query: "homeFetch"})

  return (
    <Globalcontext>
       <CourseContext.Provider value={{data,isLoading,error}}>
        <Stack screenOptions={{
          headerShown: false
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth/signIn" />
          <Stack.Screen name="auth/signUp" />
          <Stack.Screen name="course/[course]" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
       </CourseContext.Provider>
    </Globalcontext>
  
      
    
  )
}

export default ContextWrapper

const styles = StyleSheet.create({})