import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Greeting from '../utils/Greeting'


const Header = () => {
  return (
    <View className='h-24 p-3 w-full bg-green-300 rounded-2xl'>
        <Greeting />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})