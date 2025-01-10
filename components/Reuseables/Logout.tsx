import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SolidRoundSpinner from './SolidSpinner'
import ThemeText from './ThemeText'

const Logout = () => {
  return (
  <View style={{zIndex: 9999}} className="absolute top-0 w-full h-screen bg-slate-500/95 backdrop-blur-3xl justify-center items-center">
    <SolidRoundSpinner className='border-green-300'/>
    <ThemeText className='font-monserrat-medium my-7 text-3xl text-white'>Signing Out</ThemeText>
  </View>

  )
}

export default Logout

