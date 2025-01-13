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
  return (
    // <Globalcontext>
    //    <CourseContext.Provider value={{data,isLoading,error}}>
    //    <ThemeProvider value={colorScheme === "dark" ? DefaultTheme  : DarkTheme }>
    //     <Stack screenOptions={{
    //       headerShown: false,
    //       contentStyle: { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" } // Ensuring background matches theme
    //       }}>
    //       <Stack.Screen name="index" />
    //       <Stack.Screen name="(tabs)" />
    //       <Stack.Screen name="auth/signIn" />
    //       <Stack.Screen name="auth/signUp" />
    //       <Stack.Screen name="course/[course]" />
    //       <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    //     </Stack>
    //     </ThemeProvider>
    //    </CourseContext.Provider>
    // </Globalcontext>  
    <Globalcontext>
       <CourseContext.Provider value={{data, isLoading, error}}>
         {/* Wrap Stack with ThemeProvider */}
         <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
           <Stack screenOptions={{
             headerShown: false,
             contentStyle: { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" } // Ensuring background matches theme
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