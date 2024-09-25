import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SolidRoundSpinner from './SolidSpinner'

interface Btn {
  btnText: string,
  action: () => void,
  textStyle?: string,
  btnStyle?: string 
  isloading?: boolean
}

const Button = ({btnText, action, isloading, textStyle, btnStyle}: Btn) => {
  return (
    <TouchableOpacity onPress={action} className={`bg-green-300 h-[4.5rem] rounded-lg w-full justify-center ${btnStyle}`}>
      {isloading ? <SolidRoundSpinner /> :
      <Text className={`font-monserrat-bold text-gray-700 text-3xl text-center capitalize ${textStyle}`}>{btnText}</Text>}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})