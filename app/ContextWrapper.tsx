import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import { CourseContext } from '@/components/course/Context'
import UseFetch from '@/components/utils/Hooks/UseFetch'
import { Redirect, Stack } from 'expo-router'
import Globalcontext from '@/context/Globalcontext'
import Logout from '@/components/Reuseables/Logout'
import { globally } from '@/components/utils/data'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

const ContextWrapper = () => {
  const {data, isLoading, error} = UseFetch({query: "homeFetch", params: {search: "courses"}})
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme

  return (
    <Globalcontext>
       <CourseContext.Provider value={{data,isLoading,error}}>
       <ThemeProvider value={theme}>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.colors.background},
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth/signIn" />
          <Stack.Screen name="auth/signUp" />
          <Stack.Screen name="course/[course]" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        </ThemeProvider>
       </CourseContext.Provider>
    </Globalcontext>      
  )
}

export default ContextWrapper

const styles = StyleSheet.create({})